import { _ as u, b as C, C as y, E as i, d as p, e as l, q as h, r as c, o as W, h as b, w as n, m as d, n as g, __tla as __tla_0 } from "./index-43347b94.js";
import { j as _ } from "./index-ba3e05d1.js";
let x;
let __tla = Promise.all([
    (()=>{
        try {
            return __tla_0;
        } catch  {}
    })()
]).then(async ()=>{
    const E = {
        name: "format_js",
        components: {
            DualEditorLayout: C
        },
        data () {
            return {
                lineWrapping: !1,
                isCompressing: !1,
                isFormatting: !1,
                lineWrappingComp: new y
            };
        },
        mounted () {
            this.editor_left = new i({
                extensions: [
                    p,
                    _(),
                    l(),
                    this.lineWrappingComp.of(this.lineWrapping ? i.lineWrapping : [])
                ],
                parent: this.$refs.layout.getLeftContainer()
            }), this.editor_right = new i({
                extensions: [
                    p,
                    _(),
                    l(),
                    this.lineWrappingComp.of(this.lineWrapping ? i.lineWrapping : [])
                ],
                parent: this.$refs.layout.getRightContainer()
            }), this.$refs.layout.registerEditors(this.editor_left, this.editor_right);
        },
        methods: {
            handleLineWrappingChange (e) {
                this.lineWrapping = e, this.editor_left.dispatch({
                    effects: this.lineWrappingComp.reconfigure(e ? i.lineWrapping : [])
                }), this.editor_right.dispatch({
                    effects: this.lineWrappingComp.reconfigure(e ? i.lineWrapping : [])
                });
            },
            async compression_js () {
                this.isCompressing = !0;
                try {
                    const { minify: e } = await h(()=>import("./main-8ca9b4b8.js"), ["assets/main-8ca9b4b8.js","assets/minify-4fe6a371.js","assets/index-43347b94.js","assets/index-fc27619a.css"]), t = await e(this.editor_left.state.doc.toString());
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: t.code || ""
                        }
                    });
                } catch (e) {
                    console.error("请求失败:", e), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "压缩失败，请检查输入的 JS 语法是否正确"
                        }
                    });
                } finally{
                    this.isCompressing = !1;
                }
            },
            async format_js () {
                this.isFormatting = !0;
                const e = this.editor_left.state.doc.toString();
                try {
                    const t = await h(()=>import("./index-28c5c905.js").then((s)=>s.i), ["assets/index-28c5c905.js","assets/index-43347b94.js","assets/index-fc27619a.css"]), r = (t.default || t).js(e, {
                        indent_size: 4,
                        space_in_empty_paren: !0
                    });
                    this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: r
                        }
                    });
                } catch (t) {
                    console.error("请求失败:", t), this.editor_right.dispatch({
                        changes: {
                            from: 0,
                            to: this.editor_right.state.doc.length,
                            insert: "格式化失败，请检查输入的 JS 语法"
                        }
                    });
                } finally{
                    this.isFormatting = !1;
                }
            }
        }
    };
    function L(e, t, f, r, s, o) {
        const a = c("el-button"), m = c("DualEditorLayout");
        return W(), b(m, {
            ref: "layout",
            onLineWrappingChange: o.handleLineWrappingChange
        }, {
            actions: n(()=>[
                    d(a, {
                        loading: s.isCompressing,
                        onClick: o.compression_js,
                        size: "small",
                        class: "toolbar-btn"
                    }, {
                        default: n(()=>t[0] || (t[0] = [
                                g("压缩JS")
                            ])),
                        _: 1
                    }, 8, [
                        "loading",
                        "onClick"
                    ]),
                    d(a, {
                        loading: s.isFormatting,
                        onClick: o.format_js,
                        size: "small",
                        class: "toolbar-btn"
                    }, {
                        default: n(()=>t[1] || (t[1] = [
                                g("格式化JS")
                            ])),
                        _: 1
                    }, 8, [
                        "loading",
                        "onClick"
                    ])
                ]),
            _: 1
        }, 8, [
            "onLineWrappingChange"
        ]);
    }
    x = u(E, [
        [
            "render",
            L
        ],
        [
            "__scopeId",
            "data-v-3f9c1a49"
        ]
    ]);
});
export { x as default, __tla };
