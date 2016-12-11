/**
 * Created by luwenwei on 16/12/6.
 */
const Vue = require("vue");
const VueRouter = require("vue-router");
const viewA = require("./components/view_a/page_a");
const viewB = require("./components/view_b/page_b");
Vue.use(VueRouter);
var router = new VueRouter();
var App = Vue.extend({});
router.map({
    '/pageA': {
        component: viewA.MyComponent
    },
    '/pageB': {
        component: viewB.pageB
    }
});

var home = Vue.extend({
    "props":["msg"],
    "template":'<h2>this is home page!!! {{msg}}</h2>'
})
new Vue({
    el: '#home',
    components:{
        "home":home
    }
})
//Vue.component('home',home)
/*Vue.component('home', {
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
})*/
router.start(App, '#app');