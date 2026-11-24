import { _ as b, b as W, C as $, E as n, d as u, p as g, e as f, r as C, o as j, h as k, __tla as __tla_0 } from "./index-43347b94.js";
import { t as L, __tla as __tla_1 } from "./objectivec-f70eea94.js";
import "./index-63909147.js";
let O;
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
    const T = {
        name: "curl_to_spiderverse",
        components: {
            DualEditorLayout: W
        },
        data () {
            return {
                lineWrapping: !1,
                lineWrappingComp: new $
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
            deal_headers_cookie (t, e) {
                return JSON.stringify(t, (r, o)=>{
                    if (r !== "cookie") return o;
                }, e);
            },
            addSpacesToLastLine (t) {
                const e = t.split(`
`);
                for(let r = 0; r < e.length; r++)r === 0 && e[r] === "{" || (e[r] = "    " + e[r]);
                return e.join(`
`);
            },
            trans_object_to_dict (t, e) {
                return JSON.stringify(t, (r, o)=>o === !1 ? "False_trans_python" : o === !0 ? "True_trans_python" : o === null ? "None_trans_python" : o, e).replace(/"False_trans_python"/g, "False").replace(/"True_trans_python"/g, "True").replace(/"None_trans_python"/g, "None");
            },
            build_requests_code (t) {
                try {
                    const e = L(t), r = JSON.parse(e), o = new URL(r.raw_url), l = o.origin, c = o.pathname, d = l + c, m = Object.fromEntries(o.searchParams), _ = r.method, s = r.headers;
                    let p = r.data || {};
                    try {
                        p && (p = JSON.parse(p));
                    } catch  {}
                    const y = r.cookies || {};
                    let i, a;
                    const h = this.addSpacesToLastLine(this.trans_object_to_dict(p, 4));
                    return _ === "post" ? s["content-type"] && s["content-type"].indexOf("application/json") !== -1 ? (i = `
    post_data = ${h}
`, a = ", json=post_data") : s["content-type"] && s["content-type"].indexOf("application/x-www-form-urlencoded") !== -1 ? (i = `
    post_data = ${h}
`, a = ", data=post_data") : (i = `
    post_data = ${h}
`, a = ", data=json.dumps(post_data, separators=(',', ':'))") : (i = "", a = ""), `
def request_composer(data, runtime_vars):
    import json
    from urllib.parse import urlparse, parse_qs, urlencode, urljoin
    headers = ${this.deal_headers_cookie(s, 8).slice(0, -1) + "    }"}
    cookies = ${this.trans_object_to_dict(y, 8).slice(0, -1) + "    }"}
    cookie_str = "; ".join([f"{key}={value}" for key, value in cookies.items()])
    headers["cookie"] = cookie_str
    params = ${this.trans_object_to_dict(m, 8).slice(0, -1) + "    }"}
${i}
    base_url = "${d}"
    query_string = urlencode(params)
    url = urljoin(base_url, '?' + query_string)
     
    return {'url': url, 'method': '${_}', 'headers': headers${a}, 'retries': 3}
`;
                } catch (e) {
                    return console.error("请求失败:", e), `解析失败: ${e.message}`;
                }
            },
            formatcurl () {
                const t = this.editor_left.state.doc.toString();
                if (!t.trim()) {
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: ""
                        }
                    });
                    return;
                }
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
                    console.error("格式化出错:", e), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "格式化解析失败，请检查输入的 curl 命令格式"
                        }
                    });
                }
            }
        }
    };
    function S(t, e, r, o, l, c) {
        const d = C("DualEditorLayout");
        return j(), k(d, {
            ref: "layout",
            onLineWrappingChange: c.handleLineWrappingChange
        }, null, 8, [
            "onLineWrappingChange"
        ]);
    }
    O = b(T, [
        [
            "render",
            S
        ]
    ]);
});
export { O as default, __tla };
