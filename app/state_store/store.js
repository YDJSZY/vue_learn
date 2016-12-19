/**
 * Created by Apple on 16/12/19.
 */
var obj = {
    state : {
        "na":"fuck!!!!",
        "age":24
    },
    getters : {
        getNa:function(state) {
            return state.na+"o";
        }
    },
    mutations:{
        addAge:function(state,num){
            state.age+=num;
        }
    }
}

module.exports = obj;