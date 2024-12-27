// src/utils/curlconverterAdapter.js
export async function loadCurlConverter() {
    const { supportedArgs } = await import('curlconverter/dist/src/generators/python/python.js');
    const { parse } = await import('curlconverter/dist/src/parse.js');
    return { supportedArgs, parse };
  }
  