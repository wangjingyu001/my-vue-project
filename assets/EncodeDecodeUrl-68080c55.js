import{_ as p,b as c,C as h,E as t,d as a,r as l,o as u,h as g}from"./index-43347b94.js";const _={name:"encodedecode_url",components:{DualEditorLayout:c},data(){return{lineWrapping:!1,lineWrappingComp:new h}},mounted(){this._debounceTimer=null,this.editor_left=new t({extensions:[a,t.updateListener.of(e=>{e.docChanged&&(clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(()=>this.url_encode_decode(),100))}),this.lineWrappingComp.of(this.lineWrapping?t.lineWrapping:[])],parent:this.$refs.layout.getLeftContainer()}),this.editor_right=new t({extensions:[a,this.lineWrappingComp.of(this.lineWrapping?t.lineWrapping:[])],parent:this.$refs.layout.getRightContainer()}),this.$refs.layout.registerEditors(this.editor_left,this.editor_right)},beforeUnmount(){clearTimeout(this._debounceTimer)},methods:{handleLineWrappingChange(e){this.lineWrapping=e,this.editor_left.dispatch({effects:this.lineWrappingComp.reconfigure(e?t.lineWrapping:[])}),this.editor_right.dispatch({effects:this.lineWrappingComp.reconfigure(e?t.lineWrapping:[])})},url_encode_decode(){const e=this.editor_left.state.doc.toString();try{const n=encodeURI(e),o=encodeURIComponent(e),r=decodeURI(e),s=decodeURIComponent(e),i=`url 安全编码:
${n}

url 全部编码:
${o}

url 安全解码(仅 params 部分解码):
${r}

url 全部解码:
${s}
`;this.editor_right.dispatch({changes:{from:0,to:this.editor_right.state.doc.length,insert:i}})}catch(n){console.error("请求失败:",n),this.editor_right.dispatch({changes:{from:0,to:this.editor_right.state.doc.length,insert:"请求失败，请检查输入的 URL 字符串"}})}}}};function f(e,n,o,r,s,i){const d=l("DualEditorLayout");return u(),g(d,{ref:"layout",onLineWrappingChange:i.handleLineWrappingChange},null,8,["onLineWrappingChange"])}const C=p(_,[["render",f]]);export{C as default};
