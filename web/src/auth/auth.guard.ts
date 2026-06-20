import type { Router } from "vue-router";
import { login } from "./auth.service";

export const setupAuthGuard = (router: Router) => {
  router.beforeEach(async (to) => {
    if (to.path === "/callback") {
      return true;
    }

    const token = sessionStorage.getItem("access-token");

    if (!token) {
      await login();
      return false;
    }

    return true;
  });
};