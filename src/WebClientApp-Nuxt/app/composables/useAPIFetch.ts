import { useFetch } from "#app"

type useFetchType = typeof useFetch

// wrap useFetch with configuration needed to talk to our API
export const useAPIFetch: useFetchType = (path, options: any = {}) => {
  const config = useRuntimeConfig()
  const requestUrl = useRequestURL();
  const host = requestUrl.host 
  const protocol = requestUrl.protocol

  // modify options as needed
  options.baseURL = `${protocol}//${host}`

  console.log('useAPIFetch', options.baseURL, path, config.public.apiUrl)
  options.headers = { 'Content-Type': 'application/json' };
  const result =  useFetch(path, {
  // onRequest({ request, options }) {
  //   // Set the request headers
  //   // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
  //   options.headers.set('Authorization', '...')
  // },
  // onRequestError({ request, options, error }) {
  //   // Handle the request errors
  // },
  onResponse({ request, response, options }) {
    // Process the response data
    console.log('useAPIFetch response', response.text());
    
  },
  onResponseError({ request, response, options }) {
    // Handle the response errors
    console.log('useAPIFetch error', response);
  }
});

return result;
}
