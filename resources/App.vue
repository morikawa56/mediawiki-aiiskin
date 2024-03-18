<template>
  <div id="page">
    <aii-header
        :logo-width="aiiskinDataWordmark.width"
        :logo-height="aiiskinDataWordmark.height"
        :logo-src="aiiskinDataWordmark.src"
        :tagline="msgTagline"
        :mainpage="linkMainpage"
        :form-action="dataSearchBox.formAction"
        :sitetitle="msgSitetitle"
        :placeholder="msgTooltipSearch"
        :buttonLabel="msgSearch"
        :searchsuggest-text="msgSearchsuggestContaining"
        :html-user-menu="dataPortlets.dataUserMenu"
        :menu-sidebar="dataPortletsSidebar"
    ></aii-header>
  </div>
</template>

<script>
    const { mapAllKeysRecursive } = require("./utils/dataHandle.js");
    const AiiHeader = require("./AiiHeader.vue")
    module.exports = {
        name: 'App',
        props: [ 'initialData' ],
        data() {
            return mapAllKeysRecursive( this.initialData );
        },
        components: {
            AiiHeader
        },
        mounted() {
            console.log('mounted');
            console.log(this.initialData);
        },
    }
</script>

<style>
    @import url('./utils/buefy/buefy.min.css');
    @import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
    @import url('https://cdn.jsdelivr.net/npm/@mdi/font@5.8.55/css/materialdesignicons.min.css');
</style>