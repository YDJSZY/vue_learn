<template>
    <div>
        <div>this is template {{msg}}</div>
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
                getData: function () {
                console.log((new Vue()).myInfo)
                     Vue.http.get("./app/data.json",{loading:true}).then(function(response) {
                        console.log(response)
                    })
                },
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
                var vue = new Vue();
                console.log(vue.myInfo)
            }
    }
</script>
