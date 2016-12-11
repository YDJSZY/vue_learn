/**
 * Created by luwenwei on 16/12/6.
 */
const Vue = require("vue");
var Child = Vue.extend({
    props: ['msg'],
    template:'<h4>this is pageB {{name}} {{msg}}</h4>',
    data:function () {
        return {
            name:"child"
        }
    }
})

var pageB = Vue.extend({
    template: '<div class="Parent" msg="parent"><b-component></b-component></div>',
    components: {
        // <b-component> 只能用在父组件模板内
        'b-component': Child
    },
    data:function() {
        return {
            msg:"parent!!!"
        }
    }
})
export {pageB};