<template>
    <div>
        <fake-loader></fake-loader>
        <section class="content">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h5>
                        <i class="fa fa-deaf"></i>
                        A页面
                    </h5>
                </div>
                <div class="panel-body">
                    <div class="row" style="margin-bottom: 15px">
                        <form class="form-inline top-handle" style="margin-bottom: 15px">
                            <date-range min-view="0"></date-range>
                        </form>
                    </div>
                    <div>this is template {{msg}}</div>
                    <input v-model="count">
                    <input v-focus:hello.a.b="1+1">
                    <button v-on:click="getData(count)">click</button>
                    <p>{{na}}</p>
                    <p>{{age}}</p>
                    <ul>
                        <to-do :name="child">
                            <h3>我是来日伏组件</h3>
                        </to-do>
                    </ul>
                </div>
                <div class="panel-footer"></div>
            </div>
        </section>
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
                child:"child",
                datas:[
                        {"name":"luwnewei"},
                        {"name":"haungsihong"}
                    ],
            }
        },
        components:{
            "to-do":{

                render:function(createElement) {
                    return createElement('div',this.$slots.default)
                },
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
            Vue.http.get("./app/data.json",{loading:true,endLoading:true}).then(function(response) {

                })
        },

        directives: {
            focus: {
               inserted: function (el) {
                // 聚焦元素
                   el.focus()
                },
                 bind: function (el, binding, vnode) {
                    el.value = "卷珠帘";
                    console.log(binding)
                 }
            }
        }
    }
</script>
