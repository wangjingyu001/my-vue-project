<template>
  <el-row >
      <el-col :span="2" :offset="0"  v-if="el_col_left>=12">
        <el-button @click="fullScreenSpan('left')">
          {{ button1 }}
        </el-button>
      </el-col>
      <el-col :span="2" :offset="0"  v-if="el_col_left>=12">
        <el-button @click="toggleFold('left')">{{button3}}</el-button>
      </el-col>
      <el-col :span="2" :offset="20-el_col_right" v-if="el_col_right>=12">
        <el-button @click="fullScreenSpan('right')">
          {{ button2 }}
        </el-button>
      </el-col>
      <el-col :span="2" :offset="0"  v-if="el_col_right>=12">
        <el-button @click="toggleFold('right')">{{button4}}</el-button>
      </el-col>

  </el-row>
  <el-row gutter="20" class="object-to-dict" style="height: 100%;">
    <!-- 左侧 JSON 编辑区域 -->
    <el-col :span="el_col_left" style="height: 100%;">
        <el-card class="card" body-style="height:100%">
            <textarea ref="jsonEditor_left" placeholder="请输入JSON" class="json-editor-left"></textarea>
        </el-card>
    </el-col>

    <!-- 右侧 JSON 编辑区域 -->
    <el-col :span="el_col_right" style="height: 100%;">
        <el-card class="card" body-style="height:100%">
            <textarea ref="jsonEditor_right" placeholder="请输入JSON" class="json-editor-right"></textarea>
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
import { objectToDict } from '@/api/api'

export default {
  data() {
    return {
        error_message : "",
        left_content : "" ,
        right_content : "" ,
        button1 : "全屏" ,
        button2 : "全屏" ,
        button3: "折叠" ,
        button4: "折叠" ,
        // button_5: "展开" ,
        // button_6: "展开" ,
        el_col_left :12,
        el_col_right :12,
    };
  },
  watch: {
        // 监听 left_content 数据的变动
        left_content(newValue, oldValue) {
            console.log("左侧数据发生变动：", { newValue, oldValue });
            this.fetchData(newValue); // 调用处理函数
        },
        // 监听 right_content 数据的变动
        // right_content(newValue, oldValue) {
        //     console.log("右侧数据发生变动：", { newValue, oldValue });
        //     this.formatcurl(newValue); // 调用处理函数
        // },
    },
  mounted() {
    // 初始化 CodeMirror
    this.jsonEditor_left = CodeMirror.fromTextArea(this.$refs.jsonEditor_left, {
      mode: "application/json",
      foldGutter: true, 
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
      theme: "monokai",
      lineNumbers: true,
    });
    // this.jsonEditor_left.on( "mousedown", this.fetchData)
    this.jsonEditor_left.getWrapperElement().addEventListener('dblclick', this.fetchData);
    this.jsonEditor_right = CodeMirror.fromTextArea(this.$refs.jsonEditor_right, {
      mode: "application/json",
      foldGutter: true, 
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"], // 添加折叠的 gutter
      theme: "monokai",
      lineNumbers: true,
    });
    this.jsonEditor_left.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
    this.jsonEditor_right.setSize('100%', '100%'); // 设置 CodeMirror 高度为 100% 
    this.left_content = "" ;
    this.right_content = "" ;
    
  },
  methods: {
    fullScreenSpan(area){
      if (area=="left") {
        // let editor = this.jsonEditor_left;
        // this.button1 = this.button1 == "全屏" ? "还原" : "全屏";
        if (this.button1=="全屏") {
          this.button1="还原"
          this.el_col_left = 24
          this.el_col_right = 0
        }else{
          this.button1="全屏"
          this.el_col_left = 12
          this.el_col_right = 12
        }
        this.$nextTick(() => {
          this.jsonEditor_left.refresh(); // 通知 CodeMirror 刷新布局
        });
      }else{
        if (this.button2=="全屏") {
          this.button2="还原"
          this.el_col_left = 0
          this.el_col_right = 24
        }else{
          this.button2="全屏"
          this.el_col_left = 12
          this.el_col_right = 12
        }
        this.$nextTick(() => {
          this.jsonEditor_right.refresh(); // 通知 CodeMirror 刷新布局
        });
      }
      },
      toggleFold(area) { 
        if (area=="left") {
          if (this.button3=="展开") {
            this.button3 = "折叠"
            this.jsonEditor_left.execCommand('unfoldAll');
          }else{
            this.button3 = "展开"
            this.jsonEditor_left.execCommand('foldAll');
          }
        }else{
          if (this.button4=="展开") {
            this.button4 = "折叠"
            this.jsonEditor_right.execCommand('unfoldAll');
          }else{
            this.button4 = "展开"
            this.jsonEditor_right.execCommand('foldAll');
          }
        } 
      },
    async fetchData() {
        let format_str = this.jsonEditor_left.getValue();
            try {
                try {
                    format_str =  JSON.stringify(JSON.parse(format_str));
                } catch (e) { 
                }
                const response = await objectToDict(format_str);
                // this.jsonEditor_left.off("change", this.fetchData);
                if (response.data.status===200){
                    this.jsonEditor_left.setValue(response.data.result.object_js);
                    this.jsonEditor_right.setValue(response.data.result.dict_py);
                    console.log("完成格式化")
                }else{
                    this.jsonEditor_right.setValue("请求失败，请检查控制台日志或输入的数据。");
                    console.log("完成格式化")
                }
                
                
            } catch (error) {
                console.error("请求失败:", error);
                this.jsonEditor_right.setValue("请求失败，请检查控制台日志或输入的数据。");
            }finally{
                // this.jsonEditor_left.on("change", this.fetchData);
            }
        }, 
  },
};
</script>

<style scoped>

.json-editor-left {
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

  .json-editor-right {
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

