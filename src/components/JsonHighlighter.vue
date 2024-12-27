<template>
    <el-row>
        <el-col :span="5" v-if="error_message" class="error-text">{{error_message}}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_changed"> changed : {{ changed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_removed"> removed : {{ removed_nums }}</el-col>
        <el-col :span="4" v-if="!error_message" class="highlight_added"> added : {{ added_nums }}</el-col>
    </el-row>
    
  <el-row gutter="20" class="json-compare" style="height: 100%;">
    <el-col :span="12" style="height: 100%;">
        <el-card class="card" body-style="height:100%">
            <textarea ref="jsonEditor1" placeholder="请输入JSON" class="json-editor1"></textarea>
        </el-card>
    </el-col>

        <!-- 右侧 JSON 编辑区域 -->
    <el-col :span="12" style="height: 100%;">
        <el-card class="card" body-style="height:100%">
            <textarea ref="jsonEditor2" placeholder="请输入JSON" class="json-editor2"></textarea>
        </el-card>
    </el-col>

  </el-row>
</template>

<script>
import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'
import "codemirror/addon/fold/foldcode"; 
import "codemirror/addon/fold/foldgutter"; 
import "codemirror/addon/fold/brace-fold"; 
import "codemirror/lib/codemirror.css"; 
import "codemirror/addon/fold/foldgutter.css"
import { stringToJson } from "@/api/api";
// import { formatHeaders } from "@/api/api";
export default {
  name: "JsonHighlighter",
  data() {
    return {
    //   jsonEditor1: null, // CodeMirror 实例
    //   jsonEditor2: null, // CodeMirror 实例s
        error_message : "",
        changed_nums : 0,
        added_nums : 0,
        removed_nums : 0,
        left_content : "" ,
        right_content : "" ,
    };
  },
  mounted() {
    // 初始化 CodeMirror
    this.jsonEditor1 = CodeMirror.fromTextArea(this.$refs.jsonEditor1, {
      mode: "application/json",
      foldGutter: true, 
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
    //   theme: "monokai",
      lineNumbers: true,
    });
    this.jsonEditor2 = CodeMirror.fromTextArea(this.$refs.jsonEditor2, {
      mode: "application/json",
      foldGutter: true, 
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
    //   theme: "monokai",
      lineNumbers: true,
    });
    this.jsonEditor1.getWrapperElement().addEventListener('dblclick', this.highlightJsonPath);
    // this.jsonEditor1.on("mousedown", this.highlightJsonPath);
    this.jsonEditor1.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
    // this.jsonEditor2.on("mousedown", this.highlightJsonPath);
    this.jsonEditor2.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
  },
  methods: {
    compare_json(json1, json2, path=null) {
        path = path=== null ? [] : path
        var differences = []

        if (json1 instanceof Object && json2 instanceof Object){
            const keys1 = new Set(Object.keys(json1));
            const keys2 = new Set(Object.keys(json2));
            // 找出新增的键
            const difference_add = new Set([...keys2].filter(key => !keys1.has(key)));
            for (const key of difference_add) {
                differences.push({"path": path.concat([key]) , "type": "added", "value": json2[key]})
            }

            // 找出删除的键
            const difference_remove = new Set([...keys1].filter(key => !keys2.has(key)));
            for (const key of difference_remove) {
                differences.push({"path": path.concat([key]), "type": "removed", "value": json1[key]})
            }

            const difference_same = new Set([...keys1].filter(key => keys2.has(key)));
            for (const key of difference_same) {
                differences.push(...this.compare_json(json1[key], json2[key], path.concat([key])))
            }

        }else if (json1 instanceof Array && json2 instanceof Array){
            const max_len = Math.max(json1.length, json2.length)
            for (let i = 0; i < max_len; i++) {
                let new_path = path.concat([i])
                if (i>=json1.length){
                    differences.push({"path": new_path, "type": "added", "value": json2[i]})
                }else if (i>=json2.length){
                    differences.push({"path": new_path, "type": "removed", "value": json1[i]})
                }else{
                    differences.push(...this.compare_json(json1[i], json2[i], new_path))
                }
            }
        }else{
            if (json1 !== json2){
                differences.push({"path": path, "type": "changed", "value": {"from": json1, "to": json2}})
            }

        }

        return differences

    },   
    convert_json_to_tree(json_data,line=1,last_path=null,all_result = null){
        last_path = last_path === null ? [] : last_path
        all_result = all_result === null ? {} : all_result
        let key_str = '';
        if (json_data instanceof Object){
            for (const [key, value] of Object.entries(json_data)) {
                last_path.push(key)
                key_str = JSON.stringify(last_path)
                if (all_result[key_str]) {
                    all_result[key_str].push(line)
                }else{
                    all_result[key_str] = [line]
                }
                line = line + 1
                if (value instanceof Object || value instanceof Array){
                    [line,all_result] = this.convert_json_to_tree(value,  line, last_path,all_result)
                    line += 1
                }else{
                    last_path.pop()
                    if (last_path.length>0){
                        key_str = JSON.stringify(last_path)
                        all_result[key_str].push(line)
                    }
                }
            }
            if (last_path.length>0){
                last_path.pop();
                key_str = JSON.stringify(last_path);
                if (all_result[key_str]){
                    all_result[key_str].push(line+1)
                }else{
                    all_result[key_str] = [line]
                }
            }
        }else if (json_data instanceof  Array){
            for (const [i, item] of json_data.entries()) {
                last_path.push(i)
                key = JSON.stringify(last_path)
                if (all_result[key]){
                    all_result[key].push(line)
                }else{
                    all_result[key] = [line]
                }
                line = line +1 ;
                if (item instanceof Object || item instanceof Array){
                    [line,all_result] = this.convert_json_to_tree(item,  line, last_path, all_result)
                    line += 1

                }else{
                    last_path.pop()
                }
            }
            if (last_path.length>0){
                key = JSON.stringify(last_path);
                all_result[key].push(line)
                last_path.pop()
            }else{
                line += 1;
            }
        }else{
            if (last_path.length>0){
                let pop_data = last_path.pop()
            }else{
                let pop_data = ''
            }
            key = JSON.stringify(last_path)
            if (all_result[key]){
                all_result[key].push(line)
            }else{
                all_result[key] = [line]
            }
            if (typeof pop_data === 'number'){
                line = line + 1
            }
        }

        return [line,all_result]
    },
    compare_json_to_lines(json1,json2) {
        const [_1,json_tree1] = this.convert_json_to_tree(json1)
        const [_2,json_tree2] = this.convert_json_to_tree(json2)

        const  differences = this.compare_json(json1, json2)
        let json1_hightlight_change = [];
        let json2_hightlight_change = [];
        let json1_hightlight_removed = [];
        let json2_hightlight_added = [];
        for (const diff of differences) {
            if (diff['type'] === "changed"){
                let lines1 = json_tree1[JSON.stringify(diff["path"])];
                let start1 = Math.min(...lines1)
                let end1 = Math.max(...lines1)
                json1_hightlight_change.push(Array.from({ length: end1 - start1 + 1 }, (_, i) => start1 + i));


                let lines2 = json_tree2[JSON.stringify(diff["path"])];
                let start2 = Math.min(...lines2)
                let end2 = Math.max(...lines2)
                json2_hightlight_change.push(Array.from({ length: end2 - start2 + 1 }, (_, i) => start2 + i));

            }else if (diff["type"] === "added"){
                let lines3 = json_tree2[JSON.stringify(diff["path"])]
                let start3 = Math.min(...lines3)
                let end3 = Math.max(...lines3)
                json2_hightlight_added.push(Array.from({ length: end3 - start3 + 1 }, (_, i) => start3 + i));

            }else if (diff["type"] === "removed"){
                let lines4 = json_tree1[JSON.stringify(diff["path"])]
                let start4 = Math.min(...lines4)
                let end4 = Math.max(...lines4)
                json1_hightlight_removed.push(Array.from({ length: end4 - start4 + 1 }, (_, i) => start4 + i));

            }

        }
        return {
            'json1_hightlight_change' :json1_hightlight_change,
            'json2_hightlight_change': json2_hightlight_change,
            'json1_hightlight_removed' : json1_hightlight_removed,
            'json2_hightlight_added' :json2_hightlight_added
        }


    },


    setCodeMirrorHeight(editor, height) {
      editor.getWrapperElement().style.width = `${height}px`;
    },
    tryParseJSON(jsonString) {
      if (!jsonString.trim()) return null;
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        console.error("JSON解析错误:", e);
        return null;
      }
    },
    highlightLines(editor, lines, class_type) {
        
        editor.operation(() => {
        lines.forEach(lineNum => {
          editor.addLineClass(lineNum , "background", class_type); // 减1是因为行号是从0开始的
        });
      });
    },
    clearHighlights(editor) {
        editor.operation(() => {
            for (let i = 0; i < editor.lineCount(); i++) {
                let lineHandle = editor.getLineHandle(i);
                editor.removeLineClass(lineHandle, "background", "highlight_changed");
                editor.removeLineClass(lineHandle, "background", "highlight_added");
                editor.removeLineClass(lineHandle, "background", "highlight_removed");
            }
        });
    },
    async highlightJsonPath() {
      const jsonString1 = this.jsonEditor1.getValue();
      const jsonString2 = this.jsonEditor2.getValue();
    

    //   const left = JSON.parse(this.jsonLeft);
    //     if (this.jsonEditor2.getValue()==JSON.stringify(left, null, 4)){
    //       return 
    //     }

    if(this.jsonEditor1.getValue()==this.left_content && this.jsonEditor2.getValue()==this.right_content){
        return 
      }
      const [formattedLeft, formattedRight] = await Promise.all([
                stringToJson(jsonString1),
                stringToJson(jsonString2),
        ]);
      if(formattedLeft.data.status!=200){
        console.error("左侧无效的JSON格式");
        this.error_message = '左侧无效的JSON格式';
        return;
      }
      if(formattedRight.data.status!=200){
        console.error("右侧无效的JSON格式");
        this.error_message = '右侧无效的JSON格式';
        return;
      }

      this.jsonEditor1.setValue(formattedLeft.data.result);
      this.jsonEditor2.setValue(formattedRight.data.result);
        this.error_message = '';


      // 解析 JSON1
    //   const jsonObject1 = this.tryParseJSON(jsonString1);
    //   if (!jsonObject1) {
    //     console.error("左侧无效的JSON格式");
    //     this.error_message = '左侧无效的JSON格式';
    //     return;
    //   }else{

    //     // this.left_content = JSON.stringify(jsonObject1, null, 4);
    //     this.left_content = await objectToDict(JSON.stringify(jsonObject1));
    //     this.jsonEditor1.setValue(this.left_content);
    //     this.error_message = '';
    //   }
    //   const jsonObject2 = this.tryParseJSON(jsonString2);
    //   if (!jsonObject2) {
    //     console.error("右侧无效的JSON格式");
    //     this.error_message = '右侧无效的JSON格式';
    //     return;
    //   }else{
    //     // this.right_content = JSON.stringify(jsonObject2, null, 4);
    //     this.right_content = await objectToDict(JSON.stringify(jsonObject2));
    //     this.jsonEditor2.setValue(this.right_content);
    //     this.error_message = '';
    //   }

      

    // let data = this.compare_json_to_lines(jsonObject1, jsonObject2);
    // this.clearHighlights(this.jsonEditor1);   
    // this.clearHighlights(this.jsonEditor2); 
    // // 调用高亮方法
    // let jsonEditor1_changed = [...data.json1_hightlight_change.flat()]
    // let jsonEditor2_changed = [...data.json2_hightlight_change.flat()]
    // let jsonEditor1_removed = [...data.json1_hightlight_removed.flat()]
    // let jsonEditor2_added = [...data.json2_hightlight_added.flat()]
    // this.highlightLines(this.jsonEditor1, jsonEditor1_changed, "highlight_changed");
    // this.highlightLines(this.jsonEditor2, jsonEditor2_changed, "highlight_changed");
    // this.highlightLines(this.jsonEditor1, jsonEditor1_removed, "highlight_removed");
    // this.highlightLines(this.jsonEditor2, jsonEditor2_added, "highlight_added");

    // this.changed_nums = jsonEditor1_changed.length + jsonEditor2_changed.length
    // this.removed_nums = jsonEditor1_removed.length
    // this.added_nums = jsonEditor2_added.length

    
    },
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
    overflow: auto; /* 确保内容超出时出现滚动条 */
  }

  .card {
    height: 100%;
    overflow: hidden; /* 确保卡片内容不会超出卡片边界 */
  }

</style>

