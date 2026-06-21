import type { Router } from "vue-router";

function getTokenRoles(token: string): string[] {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return [];
    const payload = JSON.parse(atob(payloadPart));
    return payload?.realm_access?.roles ?? [];
  } catch {
    return [];
  }
}

export const setupAuthGuard = (router: Router) => {
  router.beforeEach((to) => {
    if (to.path === "/callback" || to.path === "/login") {
      return true;
    }

    const token = sessionStorage.getItem("access-token");

    if (!token) {
      return "/login";
    }

    const requiredRoles = to.meta.roles as string[] | undefined;
    if (requiredRoles?.length) {
      const userRoles = getTokenRoles(token);
      const hasRole = requiredRoles.some((role) => userRoles.includes(role));
      if (!hasRole) return "/home";
    }

    return true;
  });
};
