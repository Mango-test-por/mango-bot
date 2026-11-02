import { useState, useEffect } from "react";
import { IPService } from "../utils/ipService";

export const useIPManagement = (initialIP = "") => {
  const [Ip, setIp] = useState(initialIP);
  const [isLoadingIP, setIsLoadingIP] = useState(false);

  const checkBanAndRedirect = async (ip) => {
    if (!ip) return;
    
    try {
      const isBanned = await IPService.checkBan(ip);
      if (isBanned) {
        IPService.redirectToBannedSite();
      }
    } catch (error) {
      console.warn(
        "Ban check failed after retries. Check backend availability, NEXT_PUBLIC_BACKEND_URL, and CORS settings:",
        error.message
      );
    }
  };

  const fetchAndSetIP = async () => {
    try {
      setIsLoadingIP(true);
      const ip = await IPService.fetchIPAddress();
      if (ip) {
        setIp(ip);
        // A changed IP is checked by the effect below.
        if (ip === Ip) {
          await checkBanAndRedirect(ip);
        }
      }
    } catch (error) {
      console.error("Error fetching IP:", error);
    } finally {
      setIsLoadingIP(false);
    }
  };

  // Only check ban when IP changes, don't fetch IP automatically
  useEffect(() => {
    if (Ip) {
      checkBanAndRedirect(Ip);
    }
  }, [Ip]);

  return {
    Ip,
    setIp,
    isLoadingIP,
    checkBanAndRedirect,
    fetchAndSetIP,
  };
}; 
