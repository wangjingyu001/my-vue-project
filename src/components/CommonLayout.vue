<template>
  <el-container style="height: 100vh;">
    <!-- 侧边栏 -->
    <el-aside class="menu-aside">
      <div class="logo">
        <img src="../assets/logo.png" alt="Logo" class="logo-img" />
        <span class="logo-text">爬虫工具库</span>
      </div>
      <el-menu
        default-active="1"
        class="el-menu-vertical"
        @select="handleMenuClick"
      >
        <el-menu-item class="menu-item" index="1">object转dict(格式化)</el-menu-item>
        <el-menu-item class="menu-item" index="2">JSON对比</el-menu-item>
        <el-menu-item class="menu-item" index="3">cURL转requests</el-menu-item>
        <el-menu-item class="menu-item" index="4">Cookie格式化</el-menu-item>
        <el-menu-item class="menu-item" index="5">Headers格式化</el-menu-item>
        <el-menu-item class="menu-item" index="6">URL参数提取</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 内容区 -->
    <el-main class="main-content">
      <!-- <div v-if="activeMenu === '1'" class="main-content-son">
        <JsonFormat/>
      </div> -->
      <div v-if="activeMenu === '1'" class="main-content-son">
        <ObjectToDict/>
      </div>
      <div v-if="activeMenu === '2'" class="main-content-son">
        <JsonHighlighter/>
      </div>

      <div v-if="activeMenu === '3'" class="main-content-son">
        <!-- <FormatCurl/> -->
        <FormatCurl2/>
      </div>

      <div v-if="activeMenu === '4'" class="main-content-son">
        <FormatCookies/>
      </div>
      <div v-if="activeMenu === '5'" class="main-content-son">
        <FormatHeaders/>
      </div>
      
    </el-main>
  </el-container>
</template>

<script>
import JsonHighlighter from "./JsonHighlighter.vue"; // 引入组件
import JsonFormat from "./JsonFormat.vue"; // 引入组件
import FormatCurl from "./FormatCurl.vue";
import FormatCookies from "./FormatCookies.vue";
import FormatHeaders from './FormatHeaders.vue'
import ObjectToDict from './ObjectToDict.vue'
import FormatCurl2 from "./FormatCurl2.vue";

export default {
  components: {
    JsonHighlighter,
    JsonFormat,
    FormatCurl,
    FormatCurl2,
    FormatCookies,
    FormatHeaders,
    ObjectToDict
  },
  data() {
    return {
      activeMenu: "1", // 当前选中的菜单项
      isJsonValid: true, // 是否为合法 JSON
    };
  },
  methods: {
    handleMenuClick(index) {
      this.activeMenu = index; // 切换菜单
    },
  },
};
</script>

<style scoped>
/* Logo 样式 */
.logo {
  display: flex;
  align-items: center;
  padding: 3px;
}
.menu-item {
  font-size: 12px; /* 设置文字大小 */
  height : 40px;
  padding-left: 0px !important; /* 去除内边距 */
  margin: 0;  /* 去除外边距 */
  box-sizing: border-box; /* 包含内边距和边框 */
}
.logo-img {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}

.logo-text {
  font-size: 15px;
  font-weight: bold;
  color: #e74c3c;
}

/* 侧边栏菜单样式 */
.menu-aside {
  width : 130px;
}

/* 内容区样式 */
.main-content {
  /* padding-left: 130px; */
  background-color: #fff;
  overflow: hidden; /* 隐藏滚动条 */
}

.format_buttons {
  padding-top: 10px;
}

.main-content-son {
  height: 100%;
}
</style>
