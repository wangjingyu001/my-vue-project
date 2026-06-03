<template>
  <div class="dual-editor-layout">
    <!-- 工具栏 -->
    <el-row class="toolbar-row" align="middle" justify="start">
      <el-dropdown @command="handleViewCommand" trigger="click">
        <el-button size="small" class="toolbar-btn">
          视图控制
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="leftFull" v-if="elColLeft <= 12">左侧全屏</el-dropdown-item>
            <el-dropdown-item command="rightFull" v-if="elColRight <= 12">右侧全屏</el-dropdown-item>
            <el-dropdown-item command="restore" v-if="elColLeft !== 12">还原布局</el-dropdown-item>
            <el-dropdown-item disabled class="menu-divider"></el-dropdown-item>
            <el-dropdown-item v-if="elColRight <= 12" command="foldLeft">左侧{{ leftFolded ? '展开' : '折叠' }}</el-dropdown-item>
            <el-dropdown-item v-if="elColLeft <= 12" command="foldRight">右侧{{ rightFolded ? '展开' : '折叠' }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-checkbox v-model="lineWrapping" label="自动换行" size="small" class="toolbar-checkbox" border />
      
      <div class="actions-slot">
        <slot name="actions"></slot>
      </div>
    </el-row>

    <!-- 编辑器区域 -->
    <el-row :gutter="20" class="editor-row">
      <el-col :span="elColLeft" class="editor-col" v-show="elColLeft > 0">
        <div ref="editorLeftContainer" class="editor-wrapper"></div>
      </el-col>
      <el-col :span="elColRight" class="editor-col" v-show="elColRight > 0">
        <div ref="editorRightContainer" class="editor-wrapper"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ArrowDown } from '@element-plus/icons-vue';
import { codeFolding, foldAll, unfoldAll, syntaxTree, foldable, foldEffect } from "@codemirror/language";

export default {
  name: 'DualEditorLayout',
  components: {
    ArrowDown
  },
  data() {
    return {
      elColLeft: 12,
      elColRight: 12,
      leftFolded: false,
      rightFolded: false,
      lineWrapping: false
    };
  },
  watch: {
    lineWrapping(newVal) {
      this.$emit('line-wrapping-change', newVal);
    }
  },
  methods: {
    getLeftContainer() {
      return this.$refs.editorLeftContainer;
    },
    getRightContainer() {
      return this.$refs.editorRightContainer;
    },
    registerEditors(left, right) {
      this.editorLeft = left;
      this.editorRight = right;
    },
    foldAllRecursive(view) {
      if (!view) return;
      const state = view.state;
      const foldRanges = [];
      syntaxTree(state).iterate({
        enter(node) {
          const isFoldable = foldable(state, node.from, node.to);
          if (isFoldable) {
            foldRanges.push({ from: isFoldable.from, to: isFoldable.to });
          }
        }
      });
      view.dispatch({
        effects: foldRanges.map(range => foldEffect.of({ from: range.from, to: range.to }))
      });
    },
    handleViewCommand(command) {
      switch (command) {
        case 'leftFull':
          this.elColLeft = 24;
          this.elColRight = 0;
          break;
        case 'rightFull':
          this.elColLeft = 0;
          this.elColRight = 24;
          break;
        case 'restore':
          this.elColLeft = 12;
          this.elColRight = 12;
          break;
        case 'foldLeft':
          this.leftFolded = !this.leftFolded;
          if (this.leftFolded) {
            this.foldAllRecursive(this.editorLeft);
          } else {
            unfoldAll(this.editorLeft);
          }
          break;
        case 'foldRight':
          this.rightFolded = !this.rightFolded;
          if (this.rightFolded) {
            this.foldAllRecursive(this.editorRight);
          } else {
            unfoldAll(this.editorRight);
          }
          break;
      }
    }
  }
}
</script>

<style scoped>
.dual-editor-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.toolbar-row {
  padding: 8px 16px;
  background-color: var(--toolbar-bg, #f8f9fa);
  border-bottom: 1px solid var(--border-color, #e5e7eb);
  gap: 12px;
}

.toolbar-btn {
  background: var(--btn-bg, #ffffff);
  border-color: var(--border-color, #dcdfe6);
  color: var(--text-color, #606266);
}

.toolbar-btn:hover {
  background: var(--btn-hover-bg, #ecf5ff);
  border-color: var(--btn-hover-border, #c6e2ff);
  color: var(--btn-hover-text, #409eff);
}

.toolbar-checkbox {
  background: var(--btn-bg, #ffffff);
  border-color: var(--border-color, #dcdfe6);
  color: var(--text-color, #606266);
}

.actions-slot {
  display: flex;
  align-items: center;
  gap: 8px;
}

.editor-row {
  flex: 1;
  margin: 0 !important;
  height: calc(100vh - 120px);
  padding: 16px;
  background-color: var(--layout-bg, #ffffff);
}

.editor-col {
  height: 100%;
  padding: 0 10px !important;
}

.editor-wrapper {
  height: 100%;
  width: 100%;
}

.menu-divider {
  cursor: default;
  background: var(--border-color, #e5e7eb);
  height: 1px;
  padding: 0;
  margin: 5px 0;
}

/* CodeMirror 6 核心样式重塑 */
:deep(.cm-editor) {
  height: 100% !important;
  border: 1px solid var(--editor-border, #0b4bdf);
  border-radius: 6px;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, Monaco, monospace;
  font-size: 14px;
  background-color: var(--editor-bg, #ffffff);
  color: var(--editor-text, #1f2937);
  transition: border-color 0.25s, box-shadow 0.25s;
}

:deep(.cm-editor.cm-focused) {
  outline: none !important;
  border-color: var(--primary-color, #3b82f6) !important;
  box-shadow: 0 0 0 3px var(--primary-shadow, rgba(59, 130, 246, 0.15));
}

:deep(.cm-scroller) {
  font-family: inherit;
}

:deep(.cm-gutters) {
  background-color: var(--editor-gutter-bg, #f9fafb) !important;
  color: var(--editor-gutter-text, #9ca3af) !important;
  border-right: 1px solid var(--editor-border, #e5e7eb) !important;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

:deep(.cm-activeLine) {
  background-color: var(--editor-active-line-bg, rgba(59, 130, 246, 0.03));
}

:deep(.cm-activeLineGutter) {
  background-color: var(--editor-active-line-gutter-bg, rgba(59, 130, 246, 0.08));
}
</style>
