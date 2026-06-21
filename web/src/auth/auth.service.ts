import type { ITokenResponse } from "./auth.types";
import { generateCodeChallenge, generateCodeVerifier } from "./pkce";

export const login = async () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  sessionStorage.setItem("code-verifier", codeVerifier);

  const params = new URLSearchParams({
    client_id: "corretora-web",
    redirect_uri: "http://localhost:5173/callback",
    response_type: "code",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    scope: "openid",
  });

  const url = `http://localhost:8080/realms/corretora/protocol/openid-connect/auth?${params.toString()}`;

  window.location.href = url;
};

export const handleCallback = async () => {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");

  const codeVerifier = sessionStorage.getItem("code-verifier");

  if (!code || !codeVerifier) {
    throw new Error("Callback inválido");
  }

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: "corretora-web",
    redirect_uri: "http://localhost:5173/callback",
    code: code,
    code_verifier: codeVerifier,
  });

  try {
    const response = await fetch(
      "http://localhost:8080/realms/corretora/protocol/openid-connect/token",
      {
        method: "POST",
        body,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Token exchange falhou: ${response.status}`);
    }

    const token = (await response.json()) as ITokenResponse;

    sessionStorage.setItem("access-token", token.access_token);
    sessionStorage.setItem("refresh-token", token.refresh_token);
    sessionStorage.removeItem("code-verifier");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserRoles = (): string[] => {
  const token = sessionStorage.getItem("access-token");
  if (!token) return [];
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return [];
    const payload = JSON.parse(atob(payloadPart));
    return payload?.realm_access?.roles ?? [];
  } catch {
    return [];
  }
};

export const getAccessToken = () => {
  const token = sessionStorage.getItem("access-token");

  if (!token) {
    throw new Error("Token não existe");
  }

  return token;
};

export const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refresh-token");

  if (!refreshToken) {
    throw new Error("Refresh token inválido.");
  }

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: "corretora-web",
    refresh_token: refreshToken,
  });

  try {
    const response = await fetch(
      "http://localhost:8080/realms/corretora/protocol/openid-connect/token",
      {
        method: "POST",
        body,
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Token exchange falhou: ${response.status}`);
    }

    const token = (await response.json()) as ITokenResponse;

    sessionStorage.setItem("access-token", token.access_token);
    sessionStorage.setItem("refresh-token", token.refresh_token);
  } catch (error) {
    console.error(error);
    await login();
  }
};
