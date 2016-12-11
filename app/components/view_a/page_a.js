/**
 * Created by luwenwei on 16/12/6.
 */
const Vue = require("vue");
//var MyComponent = Vue.extend()

// 注册
var MyComponent = Vue.component('my-component', {
    template: '<div class="pageA">' +
    '<input v-model="name">'+
    '<h4>this is pageA {{name}}</h4></div>',
    data:function (){
        return {
            name:"luwenwei"
        }
    }
})

export {MyComponent};