<template>
    <div class="aiiskin-page-content">
        <div class="aiiskin-article">
            <div class="aiiskin-titleheading" v-html="htmlTitleHeading"></div>
            <div class="aiiskin-bodycontent" v-html="htmlBodyContent"></div>
            <div class="aiiskin-categories" v-html="htmlCategories"></div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        name: 'AiiPage',
        data() {
            return {};
        },
        props: [
            'htmlTitleHeading', 'htmlBodyContent', 'htmlCategories'
        ],
        mounted() {
            console.log(this.htmlTitleHeading)
        },
    }
</script>

<style>

</style>