/**
 * Created by luwenwei on 16/12/17.
 */

const pageA = function (resolve) {
    require.ensure(["../components/view_a/page_a.vue"],function () {
        resolve(require("../components/view_a/page_a.vue"))
    },"page_a");
}
const pageB = function (resolve) {
    require.ensure(["../components/view_b/page_b.vue"],function () {
        resolve(require("../components/view_b/page_b.vue"))
    },"page_b");
}
const Vue = require('vue');
const beforeEnter = require("./beforeEnter");
Vue.use(require('vue-resource'));
const routes = [
    {
        path: '/pageA',
        component: pageA,
        beforeEnter: beforeEnter(Vue)
    },
    { 
        path: '/pageB',
        component: pageB,
        beforeEnter: beforeEnter(Vue)
    },
    {path: '*', redirect: '/pageA'}
];

module.exports = routes;