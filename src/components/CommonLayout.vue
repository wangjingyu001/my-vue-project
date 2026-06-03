<template>
    <div class="common-layout">
        <el-container class="layout-container">
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
                    <el-menu-item class="menu-item" index="4">cURL转request py</el-menu-item>
                    <el-menu-item class="menu-item" index="6">URL参数提取</el-menu-item>
                    <el-menu-item class="menu-item" index="7">JS格式化</el-menu-item>
                    <el-menu-item class="menu-item" index="8">HTML格式化</el-menu-item>
                    <el-menu-item class="menu-item" index="9">URL编码/解码</el-menu-item>
                    <el-menu-item class="menu-item" index="10">unicode编码/解码</el-menu-item>
                    <el-menu-item class="menu-item" index="11">加解密</el-menu-item>
                </el-menu>

                <!-- 主题切换器 -->
                <div class="theme-toggle-container">
                    <el-button 
                        circle 
                        size="default" 
                        class="theme-toggle-btn" 
                        @click="toggleTheme"
                    >
                        <el-icon v-if="isDark"><Sunny /></el-icon>
                        <el-icon v-else><Moon /></el-icon>
                    </el-button>
                    <span class="theme-label">{{ isDark ? '暗色模式' : '亮色模式' }}</span>
                </div>
            </el-aside>

            <!-- 内容区 -->
            <el-main class="main-content">
                <transition name="fade-transform" mode="out-in">
                    <div :key="activeMenu" class="main-content-son">
                        <ObjectToDict v-if="activeMenu === '1'" />
                        <JsonCompare v-else-if="activeMenu === '2'" />
                        <CurlToSpiderverse v-else-if="activeMenu === '3'" />
                        <CurlToRequests v-else-if="activeMenu === '4'" />
                        <FormatUrl v-else-if="activeMenu === '6'" />
                        <FormatJs v-else-if="activeMenu === '7'" />
                        <FormatHtml v-else-if="activeMenu === '8'" />
                        <EncodeDecodeUrl v-else-if="activeMenu === '9'" />
                        <UnicodeDecode v-else-if="activeMenu === '10'" />
                        <CyberChefEmbed v-else-if="activeMenu === '11'" />
                    </div>
                </transition>
                
                <footer class="footer">
                    <a href="https://beian.miit.gov.cn/" target="_blank" class="beian-link">京ICP备2024101520号-1</a>
                    <span>|</span>
                    <a href="https://github.com/wangjingyu001/pytools-/issues" target="_blank" class="friend-link">问题反馈</a>
                </footer>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { Sunny, Moon } from '@element-plus/icons-vue';
import JsonCompare from "./JsonCompare.vue";
import ObjectToDict from './ObjectToDict.vue';
import CurlToSpiderverse from "./CurlToSpiderverse.vue";
import FormatJs from "./FormatJs.vue";
import FormatHtml from './FormatHtml.vue';
import FormatUrl from "./FormatUrl.vue";
import EncodeDecodeUrl from './EncodeDecodeUrl.vue';
import UnicodeDecode from "./UnicodeDecode.vue";
import CurlToRequests from "./CurlToRequests.vue";
import CyberChefEmbed from "./encrypt_test.vue";

export default {
    components: {
        Sunny,
        Moon,
        JsonCompare,
        CurlToRequests,
        CurlToSpiderverse,
        FormatUrl,
        ObjectToDict,
        FormatJs,
        FormatHtml,
        EncodeDecodeUrl,
        UnicodeDecode,
        CyberChefEmbed
    },
    data() {
        return {
            activeMenu: "1",
            isDark: false
        };
    },
    mounted() {
        // 初始化主题
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.isDark = true;
            document.documentElement.classList.add('dark');
        } else {
            this.isDark = false;
            document.documentElement.classList.remove('dark');
        }
    },
    methods: {
        handleMenuClick(index) {
            this.activeMenu = index;
        },
        toggleTheme() {
            this.isDark = !this.isDark;
            if (this.isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }
};
</script>

<style scoped>
.common-layout {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: var(--app-bg);
}

.layout-container {
    height: 100%;
    width: 100%;
}

/* 侧边栏样式 */
.menu-aside {
    width: 160px;
    height: 100vh;
    background-color: var(--sidebar-bg);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: background-color 0.3s, border-color 0.3s;
}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 8px;
    border-bottom: 1px solid var(--border-color);
}

.logo-img {
    width: 32px;
    height: 32px;
    margin-right: 8px;
}

.logo-text {
    font-size: 15px;
    font-weight: 700;
    color: var(--logo-color);
    letter-spacing: 0.5px;
}

.el-menu-vertical {
    border-right: none !important;
    background-color: transparent !important;
    flex: 1;
    overflow-y: auto;
    padding-top: 8px;
}

/* 菜单项样式 */
.menu-item {
    font-size: 12px;
    height: 44px;
    line-height: 44px;
    color: var(--text-color) !important;
    margin: 4px 8px;
    border-radius: 6px;
    transition: all 0.25s ease !important;
}

.menu-item:hover {
    background-color: var(--btn-hover-bg) !important;
    color: var(--btn-hover-text) !important;
}

:deep(.el-menu-item.is-active) {
    color: var(--btn-hover-text) !important;
    background-color: var(--btn-hover-bg) !important;
    font-weight: 600;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

/* 主题切换按钮区域 */
.theme-toggle-container {
    padding: 16px;
    border-top: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--sidebar-bg);
}

.theme-toggle-btn {
    background: var(--btn-bg);
    border-color: var(--border-color);
    color: var(--text-color);
}

.theme-toggle-btn:hover {
    background: var(--btn-hover-bg);
    color: var(--btn-hover-text);
    border-color: var(--btn-hover-border);
}

.theme-label {
    font-size: 11px;
    color: var(--text-muted);
    font-weight: 500;
}

/* 内容区样式 */
.main-content {
    flex: 1;
    height: 100vh;
    padding: 0;
    background-color: var(--layout-bg);
    overflow: hidden;
    position: relative;
    transition: background-color 0.3s;
}

.main-content-son {
    height: calc(100vh - 40px); /* Account for footer */
    width: 100%;
}

/* 切换动画 */
.fade-transform-enter-active,
.fade-transform-leave-active {
    transition: all 0.3s ease;
}

.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>
