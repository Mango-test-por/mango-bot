import axios from "axios";
import { buildApiUrl } from "../config/api";
import {
  retryWithBackoff,
  RETRY_CONFIGS,
  fetchWithTimeout,
} from "./retryUtils";

export class IPService {
  // One request that returns IP + geo together (no chained IP lookup first).
  // Providers are called without an explicit IP so they answer for the caller.
  static async fetchGeo() {
    const providers = [
      {
        url: "https://ipwho.is/",
        pick: (d) => d && d.success !== false && d.ip,
        map: (d) => ({ ip: d.ip, country: d.country || null, city: d.city || null }),
      },
      {
        url: "https://ipapi.co/json/",
        pick: (d) => d && !d.error && d.ip,
        map: (d) => ({
          ip: d.ip,
          country: d.country_name || d.country || null,
          city: d.city || null,
        }),
      },
      {
        url: "https://ipinfo.io/json",
        pick: (d) => d && !d.error && d.ip,
        map: (d) => ({
          ip: d.ip,
          country: d.country || null,
          city: d.city || null,
        }),
      },
    ];

    try {
      return await retryWithBackoff(async () => {
        let lastError = null;

        for (const provider of providers) {
          try {
            const response = await fetchWithTimeout(provider.url, {}, 5000);

            if (!response.ok) {
              const error = new Error(
                `HTTP ${response.status}: ${response.statusText}`
              );
              error.response = { status: response.status };
              throw error;
            }

            const data = await response.json();
            if (!provider.pick(data)) {
              throw new Error("Geo API error response");
            }

            return provider.map(data);
          } catch (error) {
            console.warn(
              `Geo provider failed (${provider.url}):`,
              error.message
            );
            lastError = error;
          }
        }

        throw lastError || new Error("All geo providers failed");
      }, RETRY_CONFIGS.EXTERNAL_API);
    } catch (error) {
      console.error("Failed to fetch geo data after retries:", error);
      return { ip: null, country: null, city: null };
    }
  }

  static async fetchIPAddress() {
    return retryWithBackoff(async () => {
      try {
        const response = await fetchWithTimeout(
          "https://api.ipify.org?format=json",
          {},
          8000
        );

        if (!response.ok) {
          const error = new Error(
            `HTTP ${response.status}: ${response.statusText}`
          );
          error.response = { status: response.status };
          throw error;
        }

        const data = await response.json();

        if (!data.ip) {
          throw new Error("Invalid response: IP address not found");
        }

        return data.ip;
      } catch (error) {
        console.error("Error fetching IP address:", error);
        throw error;
      }
    }, RETRY_CONFIGS.EXTERNAL_API);
  }

  static async fetchLocationData(ip) {
    // ipwho.is first: CORS-friendly and no key/rate-limit issues.
    // ipapi.co last: it 403s (rate limit / origin block) for some deployments.
    const providers = [
      {
        url: `https://ipwho.is/${ip}`,
        validate: (data) => data.success !== false,
      },
      {
        url: `https://ipinfo.io/${ip}/json`,
        validate: (data) => !data.error,
      },
      {
        url: `https://ipapi.co/${ip}/json`,
        validate: (data) => !data.error,
      },
    ];

    try {
      return await retryWithBackoff(async () => {
        let lastError = null;

        for (const provider of providers) {
          try {
            // Short timeout so a dead provider fails fast into the next one
            const response = await fetchWithTimeout(provider.url, {}, 5000);

            if (!response.ok) {
              const error = new Error(
                `HTTP ${response.status}: ${response.statusText}`
              );
              error.response = { status: response.status };
              throw error;
            }

            const data = await response.json();

            if (!provider.validate(data)) {
              throw new Error("Location API error response");
            }

            const location = {
              country: data.country || null,
              city: data.city || null,
            };

            if (location.country || location.city) {
              return location;
            }

            throw new Error("Location API returned no country/city");
          } catch (error) {
            console.warn(
              `Location provider failed (${provider.url}):`,
              error.message
            );
            lastError = error;
          }
        }

        throw lastError || new Error("All location providers failed");
      }, RETRY_CONFIGS.EXTERNAL_API);
    } catch (error) {
      console.error("Failed to fetch location data after retries:", error);
      return { country: null, city: null };
    }
  }

  static async checkBan(ip) {
    return retryWithBackoff(async () => {
      const response = await axios.get(buildApiUrl(`/api/checkBan/${ip}`), {
        timeout: 8000,
      });
      return response.data.data;
    }, RETRY_CONFIGS.INTERNAL_API);
  }

  static async banIP(ip) {
    return retryWithBackoff(async () => {
      try {
        await axios.get(buildApiUrl(`/api/ban/${ip}`), {
          timeout: 8000,
        });
        return true;
      } catch (error) {
        console.error("Error banning IP:", error);
        throw error;
      }
    }, RETRY_CONFIGS.INTERNAL_API);
  }

  static async redirectToBannedSite() {
    window.location.href = "https://www.porsche.com/international/aboutporsche/jobs/";
  }
}
