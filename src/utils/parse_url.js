import { tokenize } from "./tokenizer.js";
function parse_headers(headerArgs) {
    var headers = {};
    for (const header of headerArgs) {
        if (header.startsWith("@")) {
            continue;
        }

        if (header.includes(":")) {
            const colonIndex = header.indexOf(":");
            const name = header.substring(0, colonIndex);
            const value = header.substring(colonIndex + 1).trim();
            if (value) {
                headers[name.toLowerCase()] = value;
            }
            
        }
        else {
            // TODO: warn that this header arg is ignored?
        }
    }
    return headers
}
function parseArgs(args) {
    var configs = {
        "headers": [],
        "errors": []
    };
    for (let i = 0, stillflags = true; i < args.length-1; i+=2) {
        if (args[i]['tokens'][0] =='curl') {
            configs['url'] = args[i+1]['tokens'][0]
        }else if (args[i]['tokens'][0] =='-X') {
            configs['method'] = args[i+1]['tokens'][0] 
        }else if (args[i]['tokens'][0] =='-H') {
            configs['headers'].push(args[i+1]['tokens'][0]) 
        }else if (args[i]['tokens'][0] =='-b') {
            configs['cookie'] = args[i+1]['tokens'][0] 
        }else if (args[i]['tokens'][0] =='--data-raw') {
            configs['data'] = args[i+1]['tokens'][0]
        }else if (args[i]['tokens'][0] =='--data') {
            configs['data'] = args[i+1]['tokens'][0]
        }else {
            configs['errors'].push(args[i+1]['tokens'][0])
        }
    }
    return configs;
}
function parseCookies(cookieString) {
    const cookies = {};
    for (let cookie of cookieString.split(";")) {
        cookie = cookie.trim();
        if (!cookie) {
            continue;
        }
        const [name, value] = cookie.split("=", 2);
        if (name.trim()) {
            cookies[name.trim()] = (value || "").trim();
            
        }
    }
     
    return cookies;
}

function formDataToJson(formData) {
    const params = new URLSearchParams(formData);
    const jsonObject = {};
    
    for (const [key, value] of params) {
        // 如果值是 JSON 字符串，尝试解析
        if (value.startsWith('{') && value.endsWith('}')) {
            try {
                jsonObject[key] = JSON.parse(value);
            } catch (e) {
                jsonObject[key] = value;
            }
        } else {
            jsonObject[key] = value;
        }
    }
    
    return jsonObject;
}
export function parse_curl(curl_commond) {
    var curlCommands = tokenize(curl_commond);
    var result = parseArgs(curlCommands[0][0]);
    // 这里用来测试各种 headers的情况
    // result.headers.push("Content-Type: application/json:charset=utf-8")
    var headers = parse_headers(result.headers) || {};
    var cookies = parseCookies(headers.cookie||'') || {};
    const url = new URL(result.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const base_url = origin + pathname;
    const params = Object.fromEntries(url.searchParams);
    var method = 'GET';
    if (result.method) {
        method = result.method;
    }else if (result.data) {
        method = "POST";
    }else {
        method = "GET";
    }
    let data;
    if (method == "POST") {
        try {
            data = JSON.parse(result['data']);
        } catch {
            data = formDataToJson(result['data']);
            headers['content-type'] = 'application/x-www-form-urlencoded';
        }
    } else {
        data = {};
    }
    
    return {method, base_url, params, headers, cookies, data} ;
}
function deal_headers_cookie(headers, indent) {
    return JSON.stringify(headers, (key, value) => {
        if (key.toLocaleLowerCase() === 'cookie') return; // 处理 cookie 把cookie 删除
        return value;
    }, indent);
}
function trans_object_to_dict(data, indent) {
    
    return JSON.stringify(data, (key, value) => {
        if (value === false) return 'False_trans_python'; // 处理 false
        if (value === true) return 'True_trans_python'; // 处理 true
        if (value === null) return 'None_trans_python'; // 处理 null
        return value;
    }, indent).replace(/"False_trans_python"/g, "False")
        .replace(/"True_trans_python"/g, "True")
        .replace(/"None_trans_python"/g, "None");
}

export function build_requests_code(curl_strx) {
    
    let {method, base_url, params, headers, cookies, data} = parse_curl(curl_strx);

    let data_temp, data_str, data_python;
    data_python = trans_object_to_dict(data, 4);
    

    if (method == "POST") {
        if (headers['content-type'] && headers['content-type'].indexOf('application/json') !== -1) {
            data_temp = `
post_data = ${data_python}
`
            data_str = `, json=post_data`
        } else if (headers['content-type'] && headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
            data_temp = `
post_data = ${data_python}
`
            data_str = `, data=post_data`
        } else {
            data_temp = `
post_data = ${data_python}
`
            data_str = `, data=json.dumps(post_data,separators=(',', ':'))`
        }

    } else {
        data_temp = ``;
        data_str = ``;
    }

    let requests_code = `import requests
import json 
headers = ${deal_headers_cookie(headers, 4)}
cookies = ${trans_object_to_dict(cookies, 4)}
params = ${trans_object_to_dict(params, 4)}
${data_temp}
url = "${base_url}"

response = requests.${method.toLowerCase()}(url, params=params, cookies=cookies, headers=headers${data_str}, verify=False)
print(response.text)
print(response.status_code)

# from lxml import etree
# html = etree.HTML(response.text)

    
    `;

    return requests_code


}


