/**
 * Created by Apple on 16/12/19.
 */
function beforeEnter(Vue) {
    return  async function (to, from, next) {
        var vue = new Vue();
        if(vue.myInfo){
            next()
            return;
        }
        var myInfo =  await Vue.http.get("./app/myInfo.json");
        Vue.prototype.myInfo = myInfo.body;
        var constants = await Vue.http.get("./app/constants.json");
        Vue.prototype.constants = constants.body;
        vue.hideLoading(true)
        next()
    }
    
};

module.exports = beforeEnter