<template>
  <div id="app">
    {{ test }} : {{ msg }}
    <br/>
    <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
    module.exports = {
        name: 'App',
        data() {
            return {
                test: 1,
                msg: 'Welcome to Your Vue.js App'
            }
        },
        components: {

        },
        mounted() {
            console.log('mounted')
            console.log(this);
        },
    }
</script>

<style>
    @import url('./element-ui.css');
</style>