export const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array);

  const base64 = window.btoa(String.fromCharCode(...array));
  const base64Url = base64
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return base64Url;
};

export const generateCodeChallenge = async (verifier: string) => {
  const verifierBytes = new TextEncoder().encode(verifier);

  const hash = await window.crypto.subtle.digest("SHA-256", verifierBytes);

  const hashArray = new Uint8Array(hash);

  const hashBase64Url = window.btoa(String.fromCharCode(...hashArray));
  const hashBase64UrlFormatted = hashBase64Url
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return hashBase64UrlFormatted;
};
