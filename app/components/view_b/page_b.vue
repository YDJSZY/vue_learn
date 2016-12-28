<template>
    <div>
        <fake-loader></fake-loader>
        <div>this is template {{msg}} {{myInfo.name}}</div>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    const Vue = require('vue');
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                msg:'pageB',
                myInfo:(new Vue()).myInfo,
                datas:[
                        {"name":"luwnewei"},
                        {"name":"haungsihong"}
                    ],
            }
        },
        components:{
            "to-do":{
                template:"<li>{{name.name}}</li>",
                props:["name"],
            },
        },

        created: function () {


            },

        mounted: function () {
            var vue = new Vue();
            vue.hideLoading();
        }
    }
</script>
