/**
 * Created by Apple on 16/12/19.
 */
function beforeEnter(Vue) {
    return function (to, from, next) {
        var vue = new Vue();
        if(vue.myInfo){
            next()
            return;
        }
        Vue.http.get("./app/myInfo.json").then(function (response) {
            Vue.prototype.myInfo = response.body;
            next()
        })
    }
    
};

module.exports = beforeEnter