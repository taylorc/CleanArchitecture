
// wrap useFetch with configuration needed to talk to our API
export const useFollowRedirect = (response: any, options: any = {}) => {
  const config = useRuntimeConfig()

  const loginUrl = `${config.public.apiUrl}Identity/Account/Login`;

  console.log('useFollowRedirect', response.data.value);


   if (response.redirected && response.url.startsWith(loginUrl)) {
    window.location.href = `${loginUrl}?ReturnUrl=${window.location.pathname}`;
  }
}

/** const baseUrl = document.getElementsByTagName('base')[0].href;
const loginUrl = `${baseUrl}Identity/Account/Login`;

export default function followIfLoginRedirect(response) {
  if (response.redirected && response.url.startsWith(loginUrl)) {
    window.location.href = `${loginUrl}?ReturnUrl=${window.location.pathname}`;
  }
}*/