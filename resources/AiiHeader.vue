<template>
    <header class="navbar">
        <div class="navbar-brand">
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
                    <b-dropdown-item has-link custom aria-role="menuitem" v-for="(item, index) in navDropdowns" :key="index" v-html="item.outerHTML">
                    </b-dropdown-item>
                </b-dropdown>
                <b-dropdown
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
                    <b-dropdown-item has-link custom aria-role="menuitem" v-for="(htmlItem, listIndex) in getFunctionList(item['html-items'])" :key="listIndex" v-html="htmlItem.outerHTML">
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
        <!-- 搜索框区域 -->
        <div class="navbar-search">
            <cdx-typeahead-search
                id="typeahead-search-sctechinfo"
                :form-action="domain + formAction"
                search-results-label="您的搜索结果是："
                :search-results="searchResults"
                :search-footer-url="searchFooterUrl"
                :highlight-query="true"
                :visible-item-limit="5"
                :placeholder="placeholder"
                :autoExpandWidth="true"
                @input="onInput"
                @load-more="onLoadMore"
            >
                <template #default>
                    <input
                        type="hidden"
                        name="language"
                        value="zh"
                    >
                    <input
                        type="hidden"
                        name="title"
                        :value="searchpageTitle"
                    >
                </template>
                <template #search-results-pending>
                    耐心等一下，马上就好……
                </template>
                <template #search-footer-text="{ searchQuery }">
                    {{ searchsuggestText }}
                    <strong class="cdx-typeahead-search__search-footer__query">
                        {{ searchQuery }}
                    </strong>
                </template>
            </cdx-typeahead-search>
        </div>
        <!-- 用户功能区 -->
        <div class="navbar-user-menu" :class="htmlUserMenu.class">
            <div class="navbar-end-logged-in" v-if="userName!==null">
                <b-dropdown
                    position="is-bottom-left"
                    append-to-body
                    aria-role="menu"
                    class="user-menu">
                    <template #trigger>
                        <a class="user-button">
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
                    <b-dropdown-item aria-role="menuitem">
                        <div :class="userMenuItems.defaultItems[0].classList.toString()">
                            <span v-html="userMenuItems.defaultItems[0].innerHTML"></span>
                        </div>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item aria-role="menuitem" v-for="(nonditem, nondindex) in userMenuItems.nonDefaultItems" :key="nondindex">
                        <div :class="nonditem.classList.toString()">
                            <span v-html="nonditem.innerHTML"></span>
                        </div>
                    </b-dropdown-item>
                    <hr class="dropdown-divider" aria-role="menuitem">
                    <b-dropdown-item aria-role="menuitem"  value="preferences">
                        <div :class="userMenuItems.defaultItems[2].classList.toString()">
                            <b-icon icon="preferences"></b-icon>
                            <span v-html="userMenuItems.defaultItems[2].innerHTML"></span>
                        </div>
                    </b-dropdown-item>
                    <b-dropdown-item value="logout" aria-role="menuitem">
                        <div :class="userMenuItems.defaultItems[5].classList.toString()">
                            <b-icon icon="logout"></b-icon>
                            <span v-html="userMenuItems.defaultItems[5].innerHTML"></span>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>

                <div class="user-menu" :class="userMenuItems.defaultItems[1].classList.toString()" v-html="userMenuItems.defaultItems[1].innerHTML"></div>
                <div class="user-menu" :class="userMenuItems.defaultItems[3].classList.toString()" v-html="userMenuItems.defaultItems[3].innerHTML"></div>
                <div class="user-menu" :class="userMenuItems.defaultItems[4].classList.toString()" v-html="userMenuItems.defaultItems[4].innerHTML"></div>
            </div>
            <div class="navbar-end-logged-out" v-else>
                <b-dropdown
                    position="is-bottom-left"
                    append-to-body
                    aria-role="menu">
                    <template #trigger>
                        <a>
                            <span>未登录</span>
                        </a>
                    </template>

                    <b-dropdown-item aria-role="menuitem" v-for="(ditem, dindex) in userMenuItems.defaultItems" :key="dindex">
                        <div :class="ditem.classList.toString()">
                            <span v-html="ditem.innerHTML"></span>
                        </div>
                    </b-dropdown-item>
                    <!-- <b-dropdown-item custom aria-role="menuitem">
                        登录为 <b> {{ userName }}</b>
                    </b-dropdown-item>
                    <hr class="dropdown-divider">
                    <b-dropdown-item has-link aria-role="menuitem" v-html="userMenuItems[0].innerHTML">
                    </b-dropdown-item>
                    <hr class="dropdown-divider" aria-role="menuitem">
                    <b-dropdown-item value="settings">
                        <b-icon icon="settings"></b-icon>
                        Settings
                    </b-dropdown-item>
                    <b-dropdown-item value="logout" aria-role="menuitem">
                        <b-icon icon="logout"></b-icon>
                        Logout
                    </b-dropdown-item> -->
                </b-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
    const { spliceStrElement, convLi2Div } = require('./utils/dataHandle.js')
    const { CdxTypeaheadSearch } = require( '@wikimedia/codex' );
    const { fetchResults, adaptApiResponse, deduplicateResults } = require( './utils/searchHandle.js' )
    module.exports = {
        name: "AiiHeader",
        data() {
            return {
                userAvatar: '/extensions/Avatar/avatar.php?user=' + mw.config.get('wgUserName'),
                userName: mw.config.get('wgUserName'),
                searchResults: "",
                searchFooterUrl: "",
                domain: mw.config.get('wgServer'),
                currentSearchTerm: ""
            }
        },
        props: [
            // SiteInfo
            'sitetitle', 'tagline', 'mainpage',
            // Logo
		    'logoSrc', 'logoWidth', 'logoHeight',
            // ForSearch
            'placeholder', 'buttonLabel', 'searchpageTitle', 'formAction', 'searchsuggestText',
            // Menus
		    'htmlUserMenu', 'menuSidebar'
        ],
        methods: {
            getFunctionList(htmlItems) {
                return spliceStrElement(htmlItems, 'li').map(convLi2Div);
            },
            onInput(value) {
                // 该函数参考codex官方文档
                console.log( 'update:modelValue event emitted with value: ' + value );
                // 暂存当前输入的搜索词
                this.currentSearchTerm = value;
                // 如果无输入停止搜索
                if ( !value || value === '' ) {
                    this.searchResults = [];
                    this.searchFooterUrl = '';
				    return;
			    }
                fetchResults( value, 0, this.domain ).then( res => {
                    // 获得初步搜索结果列表data
                    if(this.currentSearchTerm === value) {
                        // 格式化上面的data数据并传送给组件进行显示
                        const data = res.query;
                        this.searchResults = data.search && data.search.length > 0 ? adaptApiResponse(data.search) : [];
                        // 设置搜索最后一项页脚url
                        this.searchFooterUrl = `${ this.domain }/index.php?search=${ encodeURIComponent( value ) }&title=Special%3ASearch&fulltext=1`;
                    }
                })
            },
            onLoadMore() {
                console.log( 'load-more event emitted' );
                if( !this.currentSearchTerm) return;
                fetchResults( this.currentSearchTerm, this.searchResults.length, this.domain ).then( res => {
                    const data = res.query;
                    const results = data.search && data.search.length > 0 ?
                        adaptApiResponse( data.search ) :
                        [];

                    const deduplicatedResults = deduplicateResults( results );
                    this.searchResults.push( ...deduplicatedResults );
                } );
            }
        },
        computed: {
            navDropdowns() {
                return spliceStrElement(this.menuSidebar.dataPortletsFirst.htmlItems, 'li').map(convLi2Div);
            },
            userMenuItems() {
                const arrayUserMenu = spliceStrElement(this.htmlUserMenu.htmlItems, 'li').map(convLi2Div);
                const changedArray = arrayUserMenu;
                if(mw.config.get('wgUserName') !== null) changedArray[0].innerHTML = `<a href="/User:${mw.config.get('wgUserName')}" title="您的用户页[.]" accesskey=".">用户页</a>`
                const resultObj = {defaultItems: [], nonDefaultItems: []};
                for(let i = 0; i < changedArray.length; i++) {
                    if(changedArray[i].id === "pt-userpage" || changedArray[i].id === "pt-mytalk" || changedArray[i].id === "pt-preferences" || changedArray[i].id === "pt-watchlist" || changedArray[i].id === "pt-mycontris" || changedArray[i].id === "pt-logout" || changedArray[i].id === "pt-createaccount" || changedArray[i].id === "pt-login") {
                        resultObj.defaultItems.push(changedArray[i]);
                    } else {
                        resultObj.nonDefaultItems.push(changedArray[i]);
                    }
                }
                return resultObj;
            },
        },
        components: {
            CdxTypeaheadSearch
        },
        mounted() {
            console.log(fetchResults)
            console.log(this.domain + this.formAction)
        }
    }
</script>

<style lang="less">
    @import url('./styles/AiiHeader.less');
</style>./utils/searchHandle.js