/**
 * Created by luwenwei on 16/12/6.
 */
const Vue = require("vue");
const VueRouter = require("vue-router");
const routes = require("./route/routes");
const store = require("vuex");
console.log(store)
Vue.use(require("vue-resource"));
Vue.use(VueRouter);
const router = new VueRouter({
    routes
});
var App = Vue.extend({});
Vue.http.interceptors.push((request, next)  =>{
    //console.log(request)

    next((response) => {
       // console.log(response)
    return response
    });
});
var home = Vue.extend({
    "props":["msg"],
    "template":'<h2>this is home page!!! {{msg}}</h2>'
})
const app = new Vue({
    router:router,
    store:store,
    data:{
        myData:[
            {"name":"luwnewei"},
            {"name":"haungsihong"}
        ],
        name:"vue"
    },
    beforeCreate: function () {
        // `this` 指向 vm 实例
        Vue.prototype.getMyInfo = function () {
            return this.$http.get("./app/myInfo.json");
        }
        /*
        })*/
    }
}).$mount('#app');
/*
new Vue({
    el: '#home',
    components:{
        "home":home
    }
})
//Vue.component('home',home)
/!*Vue.component('home', {
    // 声明 props
    props: ['msg'],
    // prop 可以用在模板内
    // 可以用 `this.msg` 设置
    template: '<h2>{{ msg }}</h2>'
})
new Vue({
    el: '#home',
    props: ['msg'],
    template: '<h2>{{h}} {{ msg }}</h2>',
    data:{
        h:"hello!!!"
    }
})*!/
router.start(App, '#app');*/
