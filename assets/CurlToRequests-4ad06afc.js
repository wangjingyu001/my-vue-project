import { _ as W, b as $, C, E as n, d as u, p as g, e as f, r as b, o as j, h as k, __tla as __tla_0 } from "./index-43347b94.js";
import { t as T, __tla as __tla_1 } from "./objectivec-f70eea94.js";
import "./index-63909147.js";
let S;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })(),
    (()=>{
        try {
            return __tla_1;
        } catch  {}
    })()
]).then(async ()=>{
    const L = {
        name: "curl_to_requests",
        components: {
            DualEditorLayout: $
        },
        data () {
            return {
                lineWrapping: !1,
                lineWrappingComp: new C
            };
        },
        mounted () {
            this._debounceTimer = null, this.editor_left = new n({
                extensions: [
                    u,
                    g(),
                    f(),
                    n.updateListener.of((t)=>{
                        t.docChanged && (clearTimeout(this._debounceTimer), this._debounceTimer = setTimeout(()=>this.formatcurl(), 120));
                    }),
                    this.lineWrappingComp.of(this.lineWrapping ? n.lineWrapping : [])
                ],
                parent: this.$refs.layout.getLeftContainer()
            }), this.editor_right = new n({
                extensions: [
                    u,
                    g(),
                    f(),
                    this.lineWrappingComp.of(this.lineWrapping ? n.lineWrapping : [])
                ],
                parent: this.$refs.layout.getRightContainer()
            }), this.$refs.layout.registerEditors(this.editor_left, this.editor_right);
        },
        beforeUnmount () {
            clearTimeout(this._debounceTimer);
        },
        methods: {
            handleLineWrappingChange (t) {
                this.lineWrapping = t, this.editor_left.dispatch({
                    effects: this.lineWrappingComp.reconfigure(t ? n.lineWrapping : [])
                }), this.editor_right.dispatch({
                    effects: this.lineWrappingComp.reconfigure(t ? n.lineWrapping : [])
                });
            },
            trans_object_to_dict (t, e) {
                return JSON.stringify(t, (o, r)=>r === !1 ? "False_trans_python" : r === !0 ? "True_trans_python" : r === null ? "None_trans_python" : r, e).replace(/"False_trans_python"/g, "False").replace(/"True_trans_python"/g, "True").replace(/"None_trans_python"/g, "None");
            },
            deal_headers_cookie (t, e) {
                return JSON.stringify(t, (o, r)=>{
                    if (o !== "cookie") return r;
                }, e);
            },
            build_requests_code (t) {
                try {
                    const e = T(t), o = JSON.parse(e), r = new URL(o.raw_url), _ = r.origin, d = r.pathname, h = _ + d, m = Object.fromEntries(r.searchParams), l = o.method, s = o.headers;
                    let p = o.data || {};
                    try {
                        p && (p = JSON.parse(p));
                    } catch  {
                        console.log("不是json格式的数据");
                    }
                    const y = o.cookies || {};
                    let i, a, c;
                    return c = this.trans_object_to_dict(p, 4), l === "post" ? s["content-type"] && s["content-type"].indexOf("application/json") !== -1 ? (i = `post_data = ${c}
`, a = ", json=post_data") : s["content-type"] && s["content-type"].indexOf("application/x-www-form-urlencoded") !== -1 ? (i = `post_data = ${c}
`, a = ", data=post_data") : (i = `post_data = ${c}
`, a = ", data=json.dumps(post_data, separators=(',', ':'))") : (i = "", a = ""), `import requests
import json 

headers = ${this.deal_headers_cookie(s, 4)}
cookies = ${this.trans_object_to_dict(y, 4)}
params = ${this.trans_object_to_dict(m, 4)}
${i}url = "${h}"

response = requests.${l}(url, params=params, cookies=cookies, headers=headers${a}, verify=False)
print(response.text)
print(response.status_code)
`;
                } catch (e) {
                    return console.error("解析失败:", e), `解析失败: ${e.message}`;
                }
            },
            formatcurl () {
                const t = this.editor_left.state.doc.toString();
                try {
                    const e = this.build_requests_code(t);
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: e
                        }
                    });
                } catch (e) {
                    console.error("请求失败:", e), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "请求失败，请检查输入的 curl 命令格式"
                        }
                    });
                }
            }
        }
    };
    function w(t, e, o, r, _, d) {
        const h = b("DualEditorLayout");
        return j(), k(h, {
            ref: "layout",
            onLineWrappingChange: d.handleLineWrappingChange
        }, null, 8, [
            "onLineWrappingChange"
        ]);
    }
    S = W(L, [
        [
            "render",
            w
        ]
    ]);
});
export { S as default, __tla };
