/**
 * Created by luwenwei on 16/12/17.
 */
var pageA = require("../components/view_a/page_a.vue");
var pageB = require("../components/view_b/page_b.vue");
const Vue = require('vue');
Vue.use(require('vue-resource'));
const routes = [
    {
        path: '/pageA',
        component: pageA,
        beforeEnter: function (to, from, next) {
            var vue = new Vue();
            if(vue.myInfo){
                next()
                return;
            }
            console.log(Vue.http)
            Vue.http.get("./app/myInfo.json").then(function (response) {
                Vue.prototype.myInfo = response.body;
                next()
            })
        }
    },
    { path: '/pageB', component: pageB }
];

module.exports = routes;