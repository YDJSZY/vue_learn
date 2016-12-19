/**
 * Created by luwenwei on 16/12/17.
 */
var pageA = require("../components/view_a/page_a.vue");
var pageB = require("../components/view_b/page_b.vue");
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
    }
];

module.exports = routes;