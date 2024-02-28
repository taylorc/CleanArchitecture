import { joinURL } from "ufo";

export default defineEventHandler((event) => {
    
    const apiProxyUrl = useRuntimeConfig().apiProxyUrl;
    
    const path = event.path.replace(/^\/api\//, ''); // /api/weatherforecasts -> weatherforecasts

    const target = joinURL(apiProxyUrl, path);

    console.log(target);    

    return proxyRequest(event, target);
  })