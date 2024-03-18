<template>
    <!-- <header class="aii-skin-header">
        <div class="site-logo-wordmark">
            <a :href="mainpage" :title="tagline">
                <h1 class="sitetitle-word"> {{ sitetitle }}</h1>
            </a>
        </div>
        <div class="sidebar-function">
        </div>
    </header> -->
    <header class="navbar">
        <div class="navbar-brand site-logo-wordmark">
            <!-- logo或站点标题区域 -->
            <div class="site-logo-wordmark">
                <a :href="mainpage" :title="tagline">
                    <img :src="logoSrc" alt="sitetitle" class="logo-icon" v-if="logoSrc" :width="logoWidth" :height="logoHeight">
                    <h1 class="sitetitle-word" v-else> {{ sitetitle }}</h1>
                </a>
            </div>
            <!-- （原）侧边栏功能区 -->
            <div class="sidebar-function">
                <b-dropdown
                    v-model="navigation"
                    position="is-bottom"
                    append-to-body
                    aria-role="menu"
                    :class="menuSidebar.dataPortletsFirst.class"
                    :id="menuSidebar.dataPortletsFirst.id">
                    <template #trigger>
                        <a
                            class="navbar-item"
                            role="button">
                            <span> {{ menuSidebar.dataPortletsFirst.label }}</span>
                        </a>
                    </template>
                    <b-dropdown-item custom aria-role="menuitem" v-for="(item, index) in navDropdowns" :key="index" v-html="item.outerHTML">
                    </b-dropdown-item>
                </b-dropdown>
                <b-dropdown
                    v-model="navigation"
                    position="is-bottom"
                    append-to-body
                    aria-role="menu"
                    v-for="(item, index) in menuSidebar.arrayPortletsRest"
                    :key="index"
                    :class="item.class"
                    :id="item.id">
                    <template #trigger>
                        <a
                            class="navbar-item"
                            role="button">
                            <span> {{ item.label }}</span>
                        </a>
                    </template>
                    <b-dropdown-item custom aria-role="menuitem" v-for="(htmlItem, listIndex) in getFunctionList(item['html-items'])" :key="listIndex" v-html="htmlItem.outerHTML">
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>

        <div class="navbar-user-menu" :class="htmlUserMenu.class">
            <div class="navbar-end">
                <b-dropdown
                    v-model="navigation"
                    position="is-bottom-left"
                    append-to-body
                    aria-role="menu">
                    <template #trigger>
                        <a>
                            <img 
                                class="user-avatar"
                                :src="userAvatar" 
                                alt="">
                            <span>{{ userName }}</span>
                        </a>
                    </template>


                    <b-dropdown-item custom aria-role="menuitem">
                        登录为 <b> {{ userName }}</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item has-link aria-role="menuitem">
                        <a href="" target="_blank">
                            用户页
                        </a>
                    </b-dropdown-item>
                    <hr class="dropdown-divider" aria-role="menuitem">
                    <b-dropdown-item value="settings">
                        <b-icon icon="settings"></b-icon>
                        Settings
                    </b-dropdown-item>
                    <b-dropdown-item value="logout" aria-role="menuitem">
                        <b-icon icon="logout"></b-icon>
                        Logout
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    const { spliceStrElement, convLi2Div } = require('./utils/dataHandle.js')
    module.exports = {
        name: "AiiHeader",
        data() {
            return {
                userAvatar: '/extensions/Avatar/avatar.php?user=' + mw.config.get('wgUserName'),
                userName: mw.config.get('wgUserName')
            }
        },
        props: [
            // SiteInfo
            'sitetitle', 'tagline', 'mainpage',
            // Logo
		    'logoSrc', 'logoWidth', 'logoHeight',
            // ForSearch
            'placeholder', 'buttonLabel', 'searchsuggestText',
            // Menus
		    'htmlUserMenu', 'menuSidebar'
        ],
        methods: {
            getFunctionList(htmlItems) {
                return spliceStrElement(htmlItems, 'li').map(convLi2Div);
            }
        },
        computed: {
            navDropdowns() {
                return spliceStrElement(this.menuSidebar.dataPortletsFirst.htmlItems, 'li').map(convLi2Div);
            },
            userMenuItems() {
                return spliceStrElement(this.htmlUserMenu.htmlItems, 'li').map(convLi2Div);
            }
        },
        mounted() {
            console.log(this.userMenuItems)
            console.log(this.userAvater)
            // console.log(this.navDropdowns)
        }
    }
</script>

<style>
</style>