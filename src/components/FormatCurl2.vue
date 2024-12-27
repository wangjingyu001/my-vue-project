<template>


    <el-row gutter="20" class="json-format" style="height: 100%;">
        <!-- 左侧 JSON 编辑区域 -->

        <el-col :span="12" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonLeft" placeholder="在这里粘贴cURL(bash) " class="json-editor"></textarea>
            </el-card>
        </el-col>

        <!-- 右侧 JSON 编辑区域 -->
        <el-col :span="12" style="height: 100%;">
            <el-card class="card" body-style="height:100%">
                <textarea v-model="jsonRight" ref="jsonEditor2" placeholder="点击处理" class="json-editor"></textarea>
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import 'codemirror/mode/python/python';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/fold/foldgutter.css"
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import "codemirror/addon/fold/indent-fold";
// import * as curlconverter from 'curlconverter';
import { supportedArgs } from 'curlconverter/dist/src/generators/python/python.js';
import { parse } from 'curlconverter/dist/src/parse.js';
// import { loadCurlConverter } from '@/utils/curlconverterAdapter.js';

export default {
    data() {
        return {
            jsonLeft: "", // 左侧 JSON 输入
            jsonRight: "", // 右侧 JSON 输入
            compareResult: null, // 比对结果
            responseData : "",
        };
    },
    watch: {
        // 监听 text 数据的变动
        jsonLeft(newValue, oldValue) {
            console.log("数据发生变动：", { newValue, oldValue });
            this.formatcurl(newValue); // 调用处理函数
        },
    },
    async mounted() {
        // 初始化 CodeMirror
        this.jsonEditor2 = CodeMirror.fromTextArea(this.$refs.jsonEditor2, {
            mode: "python",
            //   theme: "monokai",
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
            // lineWrapping: true, // 启用自动换行
            lineNumbers: true,
            scrollbarStyle: "simple" // 使用原生滚动条样式
        });
        this.jsonEditor2.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
        this.jsonLeft = "";
        // this.jsonEditor2.on("mousedown", this.formatcurl);
        // const { supportedArgs } = await import('curlconverter/dist/src/generators/python/python.js');
        // const { parse } = await import('curlconverter/dist/src/parse.js');
        // const { supportedArgs, parse } = await loadCurlConverter();
        // this.supportedArgs = supportedArgs;
        // this.parse = parse;
    },
    methods: {
        // curlconverter_method(curl_bash){
        //     curlconverter.toPython
        // },
        parse_curl(curl_commond) {
    var result = parse(curl_commond, supportedArgs)


    let method = result[0].urls[0].method;
    let base_url = result[0].urls[0].urlWithoutQueryArray;
    let params = result[0].urls[0].queryDict ? result[0].urls[0].queryDict.reduce((acc, [key, value]) => {
        acc[key.toString()] = value.toString();
        return acc;
    }, {}) : {};
    let headers = result[0].headers.headers.reduce((acc, [key, value]) => {
        acc[key.toString()] = value.toString();
        return acc;
    }, {});
    let cookies = result[0].cookies ? result[0].cookies.reduce((acc, [key, value]) => {
        acc[key.toString()] = value.toString();
        return acc;
    }, {}) : {};
    if (JSON.stringify(cookies) === '{}' && headers['cookie'] != undefined) {
            let cookie_split_list = headers['cookie'].split(';');
            for (let index = 0; index < cookie_split_list.length; index++) {
                const element = cookie_split_list[index];
                const [key, value = '']  = element.split('=',2)
                cookies[key.trim()] = value.trim()
            
        }
    }

    let data, data_temp, data_str;
    if (method.toString() == "POST") {
        data = JSON.parse(result[0].dataArray[0])

        if (headers['content-type'] && headers['content-type'].indexOf('application/json') !== -1) {
            data_temp = `
post_data = ${JSON.stringify(data, null, 4)}
    `
        data_str = `, json=post_data`
        } else if (headers['content-type'] && headers['content-type'].indexOf('application/x-www-form-urlencoded') !== -1) {
            data_temp = `
post_data = ${JSON.stringify(data, null, 4)}
    `
        data_str = `, data=post_data`
        } else {
            data_temp = `
post_data = ${JSON.stringify(data, null, 4)}
    `
            data_str = `, data=json.dumps(post_data,separators=(',', ':'))`
        }

    } else {
        data_temp = ``;
        data_str = ``;
    }
    let requests_code = `import requests
import json 
# from urllib.parse import urlparse, parse_qs, urlencode, urljoin
cookies = ${JSON.stringify(cookies, null, 4)}
cookie_str = "; ".join([f"{{key}}={{value}}" for key, value in cookies.items()])
headers = ${JSON.stringify(headers, null, 4)}
headers["cookie"] = cookie_str
params = ${JSON.stringify(params, null, 4)}
${data_temp}
base_url = "${base_url}"
# query_string = urlencode(params)
# full_url = urljoin(base_url, '?' + query_string)
response = requests.${method.toLowerCase()}(base_url, params=params, headers=headers${data_str}, verify=False)
# response = requests.{method}(full_url, headers=headers{data_str}, verify=False)
print(response.text)
print(response.status_code)
# from lxml import etree
# html = etree.HTML(response.text)

    
    `

    // console.log(requests_code)
    return requests_code
        },
        fetchData(format_str) {
            try {
                // 发起请求，替换为你的接口地址
                // const format_str = this.format_str;
                const response = this.parse_curl(format_str);
                    this.jsonEditor2.setValue(response);
                    console.log("完成格式化")
            } catch (error) {
                console.error("请求失败:", error);
                this.jsonEditor2.setValue("请求失败，请检查控制台日志或输入的curl。");
            }
        },
        formatcurl(format_str) {
            this.fetchData(format_str)

            // this.jsonEditor2.setValue(JSON.parse(this.responseData).result);
            // console.log("完成格式化")
        }
    },
};
</script>

<style scoped>
.json-editor {
    width: 100%;
    height: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    box-sizing: border-box;
    overflow: auto;
    /* 确保内容超出时出现滚动条 */
}

.error-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.card {
    height: 100%;
    overflow: hidden;
    /* 确保卡片内容不会超出卡片边界 */
}
</style>