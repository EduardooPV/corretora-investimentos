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

    const token = await response.json();

    sessionStorage.setItem("access-token", token.access_token);
    sessionStorage.removeItem("code-verifier");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAccessToken = () => {
  const token = sessionStorage.getItem("access-token");

  if (!token) {
    throw new Error("Token não existe");
  }

  return token;
};
