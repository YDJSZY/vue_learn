<template>
    <div>
        <div>this is template {{msg}}</div>
        <input v-model="count">
        <button v-on:click="getData(count)">click</button>
        <p>{{na}}</p>
        <p>{{age}}</p>
        <ul>
            <to-do v-for="item in datas" v-bind:name="item"></to-do>
        </ul>
    </div>
</template>
<style>
    body{
        background-color:#ff0000;
    }
</style>
<script>
    const Vue = require('vue');
    const mapGetters = require('vuex').mapGetters;
    Vue.use(require('vue-resource'));
    module.exports = {
        data(){
            return{
                msg:'pageA',
                num:1,
                count:1,
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

        methods:{
            getData: function (count) {
                this.msg = "pageA!!!";
                this.numPlus = parseInt(count);
                console.log(this.num);
                console.log(this.$store.getters.getNa);
                this.$store.commit("addAge",1);
                 Vue.http.get("./app/data.json",{loading:true}).then(function(response) {

                })
            },
        },

        computed: {
            numPlus:{
                get:function() {
                    return this.num;
                },
                set:function(n) {
                    this.num+=n;
                }
            },
            na:function() {
                return this.$store.state.na;
            },
            age:function() {
                return this.$store.state.age;
            }


        },

        created: function () {
                var vue = new Vue();

            }
    }
</script>
