<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边栏 -->
            <el-aside class="menu-aside">
                <div class="logo">
                    <img src="../assets/logo.png" alt="Logo" class="logo-img" />
                    <span class="logo-text">爬虫工具库</span>
                </div>
                <el-menu default-active="1" class="el-menu-vertical" @select="handleMenuClick">
                    <el-menu-item class="menu-item" index="1">object转dict(格式化)</el-menu-item>
                    <el-menu-item class="menu-item" index="2">JSON对比</el-menu-item>
                    <el-menu-item class="menu-item" index="3">cURL转Function</el-menu-item>
                    <el-menu-item class="menu-item" index="4">cURL转request py </el-menu-item>
                    <!-- <el-menu-item class="menu-item" index="5" disabled>Headers格式化</el-menu-item> -->
                    <el-menu-item class="menu-item" index="6">URL参数提取</el-menu-item>
                    <el-menu-item class="menu-item" index="7">JS格式化</el-menu-item>
                    <el-menu-item class="menu-item" index="8">HTML格式化</el-menu-item>
                    <el-menu-item class="menu-item" index="9">URL编码/解码</el-menu-item>
                    <el-menu-item class="menu-item" index="10">unicode编码/解码</el-menu-item>
                    <el-menu-item class="menu-item" index="11">加解密</el-menu-item>
                </el-menu>
            </el-aside>

            <!-- 内容区 -->
            <el-main class="main-content">
                <!-- <div v-if="activeMenu === '1'" class="main-content-son">
        <JsonFormat/>
      </div> -->
                <div v-if="activeMenu === '1'" class="main-content-son">
                    <ObjectToDict />
                </div>
                <div v-if="activeMenu === '2'" class="main-content-son">
                    <JsonCompare />
                </div>

                <div v-if="activeMenu === '3'" class="main-content-son">
                    <!-- <FormatCurl/> -->
                    <CurlToSpiderverse />
                </div>

                <div v-if="activeMenu === '4'" class="main-content-son">
                    <CurlToRequests />
                </div>
                <!-- <div v-if="activeMenu === '5'" class="main-content-son">
                    <FormatHeaders />
                </div> -->
                <div v-if="activeMenu === '6'" class="main-content-son">
                    <FormatUrl /> <!--  这里还没写-->
                </div>
                <div v-if="activeMenu === '7'" class="main-content-son">
                    <FormatJs />
                </div>
                <div v-if="activeMenu === '8'" class="main-content-son">
                    <FormatHtml />
                </div>
                <div v-if="activeMenu === '9'" class="main-content-son">
                    <EncodeDecodeUrl />
                </div>
                <div v-if="activeMenu === '10'" class="main-content-son">
                    <UnicodeDecode />
                </div>
                <div v-if="activeMenu === '11'" class="main-content-son">
                    <Encrypt />
                </div>
                <footer class="footer">
                    <a href="https://beian.miit.gov.cn/" target="_blank" class="beian-link">京ICP备2024101520号-1</a>
                    <span> | </span>
                    <a href="https://github.com/wangjingyu001/pytools-/issues" target="_blank" class="friend-link">问题反馈</a>

                </footer>
            </el-main>

        </el-container>

    </div>
</template>

<script>
import JsonCompare from "./JsonCompare.vue"; // 引入组件
// import JsonFormat from "./JsonFormat.vue"; // 引入组件
import ObjectToDict from './ObjectToDict.vue';
import CurlToSpiderverse from "./CurlToSpiderverse.vue";
import FormatJs from "./FormatJs.vue";
// import FormatHtml from './FormatHtml.vue';
import FormatUrl from "./FormatUrl.vue";
// import EncodeDecodeUrl from './EncodeDecodeUrl.vue'
// import UnicodeDecode from "./UnicodeDecode.vue";
import CurlToRequests from "./CurlToRequests.vue";
// import Encrypt from "./Encrypt.vue";


export default {
    components: {
        JsonCompare,
        // JsonFormat,
        CurlToRequests,
        CurlToSpiderverse,
        FormatUrl,
        ObjectToDict,
        FormatJs,
        // FormatHtml,
        // EncodeDecodeUrl,
        // UnicodeDecode,
        // Encrypt
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
    font-size: 12px;
    height: 40px;
    /* 增加以下样式 */
    display: flex;
    align-items: center;
    padding: 0 10px !important;
    /* 调整左右padding */
    line-height: 40px;
    white-space: nowrap;
    /* 防止文本换行 */
    overflow: hidden;
    /* 防止文本溢出 */
    text-overflow: ellipsis;
    /* 文本溢出时显示省略号 */
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
    width: 130px;
    height: 100vh;
    max-height: calc(100vh - 20px);
    /* 确保侧边栏高度适应视口 */
    overflow-y: auto;
    /* 允许垂直滚动 */
    overflow-x: hidden;
    /* 禁止水平滚动 */
}

.menu-item:hover {
    background-color: #1e90ff;
    /* 鼠标悬停时的背景色 */
    color: #ffffff;
}

/* 内容区样式 */
.main-content {
    /* padding-left: 130px; */
    height: 100vh;
    max-height: calc(100vh - 20px);
    /* 确保内容区高度适应视口 */
    padding: 0px;
    background-color: #fff;
    overflow: hidden;
    /* 隐藏滚动条 */
}

.format_buttons {
    padding-top: 10px;
}

.main-content-son {
    height: 100%;
    padding: 0px;
}
</style>
