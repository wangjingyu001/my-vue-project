import axios from "axios";

// 创建 axios 实例
const apiClient = axios.create({
    baseURL: "https://pytools.site/api",
    timeout: 5000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  }
});
// 通用的 API 调用函数
const callApi = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response; // 返回数据部分
  } catch (error) {
    console.error("API Error:", error);
    throw error; // 抛出错误以便调用方处理
  }
};

// 封装接口方法
export const formatJson = (formatStr) => callApi("/format_json/", { format_str: formatStr });
export const formatCurl = (formatStr) => callApi("/format_curl/", { format_str: formatStr });
export const formatCookies = (formatStr) => callApi("/format_cookies/", { format_str: formatStr });
export const formatHeaders = (formatStr) => callApi("/format_headers/", { format_str: formatStr });
export const objectToDict = (formatStr) => callApi("/object_to_dict/", { format_str: formatStr });
export const stringToJson = (formatStr) => callApi("/string_to_json/", { format_str: formatStr });
export const stringToObject = (formatStr) => callApi("/string_to_object/", { format_str: formatStr });
export const compareJson = (json1, json2) => callApi("/compare_json/", { json1, json2 });

export default apiClient; // 导出实例用于其他场景
