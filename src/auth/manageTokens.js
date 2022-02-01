const TOKEN_ACCESS_KEY = "accessToken";
const TOKEN_REFRESH_KEY = "refreshToken";

export function saveTokens(tokens) {
  localStorage.setItem(TOKEN_ACCESS_KEY, tokens.accessToken);
  localStorage.setItem(TOKEN_REFRESH_KEY, tokens.refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(TOKEN_REFRESH_KEY);
}

export function deleteTokens() {
  localStorage.removeItem(TOKEN_ACCESS_KEY);
  localStorage.removeItem(TOKEN_REFRESH_KEY);
}
