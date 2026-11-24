<template>
    <div class="common-layout">
        <el-container class="layout-container">
            <!-- 侧边栏 -->
            <el-aside class="menu-aside">
                <div class="logo">
                    <img src="../assets/logo.png" alt="Logo" class="logo-img" width="32" height="32" />
                    <span class="logo-text">爬虫工具库</span>
                </div>
                
                <el-menu default-active="1" class="el-menu-vertical" @select="handleMenuClick">
                    <el-menu-item class="menu-item" index="1">object转dict(格式化)</el-menu-item>
                    <el-menu-item class="menu-item" index="2">JSON对比</el-menu-item>
                    <el-menu-item class="menu-item" index="3" @mouseenter="preloadCurl">cURL转Function</el-menu-item>
                    <el-menu-item class="menu-item" index="4" @mouseenter="preloadCurl">cURL转request py</el-menu-item>
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
                <div class="main-content-son" v-show="activeMenu !== '11'">
                    <keep-alive>
                        <component :is="currentEditorComponent" />
                    </keep-alive>
                </div>
                <div class="main-content-son" v-if="cyberChefLoaded" v-show="activeMenu === '11'">
                    <CyberChefEmbed />
                </div>
                
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
import { defineAsyncComponent } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';
import ObjectToDict from './ObjectToDict.vue';

const loadJsonCompare = () => import('./JsonCompare.vue');
const loadFormatUrl = () => import('./FormatUrl.vue');
const loadFormatJs = () => import('./FormatJs.vue');
const loadFormatHtml = () => import('./FormatHtml.vue');
const loadEncodeDecodeUrl = () => import('./EncodeDecodeUrl.vue');
const loadUnicodeDecode = () => import('./UnicodeDecode.vue');
const loadCurlToSpiderverse = () => import('./CurlToSpiderverse.vue');
const loadCurlToRequests = () => import('./CurlToRequests.vue');
const loadCyberChef = () => import('./encrypt_test.vue');

const JsonCompare = defineAsyncComponent(loadJsonCompare);
const FormatUrl = defineAsyncComponent(loadFormatUrl);
const FormatJs = defineAsyncComponent(loadFormatJs);
const FormatHtml = defineAsyncComponent(loadFormatHtml);
const EncodeDecodeUrl = defineAsyncComponent(loadEncodeDecodeUrl);
const UnicodeDecode = defineAsyncComponent(loadUnicodeDecode);
const CurlToSpiderverse = defineAsyncComponent(loadCurlToSpiderverse);
const CurlToRequests = defineAsyncComponent(loadCurlToRequests);
const CyberChefEmbed = defineAsyncComponent(loadCyberChef);

const MENU_COMPONENT_MAP = {
    '1': 'ObjectToDict',
    '2': 'JsonCompare',
    '3': 'CurlToSpiderverse',
    '4': 'CurlToRequests',
    '6': 'FormatUrl',
    '7': 'FormatJs',
    '8': 'FormatHtml',
    '9': 'EncodeDecodeUrl',
    '10': 'UnicodeDecode'
};

export default {
    components: {
        Sunny,
        Moon,
        ObjectToDict,
        JsonCompare,
        CurlToRequests,
        CurlToSpiderverse,
        FormatUrl,
        FormatJs,
        FormatHtml,
        EncodeDecodeUrl,
        UnicodeDecode,
        CyberChefEmbed
    },
    data() {
        return {
            activeMenu: '1',
            isDark: false,
            cyberChefLoaded: false,
            curlPreloaded: false
        };
    },
    computed: {
        currentEditorComponent() {
            return MENU_COMPONENT_MAP[this.activeMenu] || 'ObjectToDict';
        }
    },
    mounted() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.isDark = true;
            document.documentElement.classList.add('dark');
        } else {
            this.isDark = false;
            document.documentElement.classList.remove('dark');
        }

        // 首屏渲染完毕后，利用浏览器空闲时间静默预热常用轻量组件
        const warmup = () => {
            loadJsonCompare();
            loadFormatUrl();
            loadEncodeDecodeUrl();
            loadUnicodeDecode();
            loadFormatJs();
            loadFormatHtml();
        };
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(warmup, { timeout: 2000 });
        } else {
            setTimeout(warmup, 800);
        }
    },
    methods: {
        handleMenuClick(index) {
            if (index === '11') {
                this.cyberChefLoaded = true;
            }
            this.activeMenu = index;
        },
        preloadCurl() {
            if (this.curlPreloaded) return;
            this.curlPreloaded = true;
            loadCurlToSpiderverse();
            loadCurlToRequests();
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
    transition: background-color 0.2s, border-color 0.2s;
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
    transition: background-color 0.15s ease, color 0.15s ease !important;
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
    transition: background-color 0.2s;
}

.main-content-son {
    height: calc(100vh - 40px);
    width: 100%;
}
</style>
