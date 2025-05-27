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
  return useFetch(path, options)
}