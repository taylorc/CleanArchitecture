const baseUrl = window.location.origin;
const loginUrl = `${baseUrl}Identity/Account/Login`;

export default function followIfLoginRedirect(response: { redirected: any; url: string; }) {
  if (response.redirected && response.url.startsWith(loginUrl)) {
    window.location.href = `${loginUrl}?ReturnUrl=${window.location.pathname}`;
  }
}
