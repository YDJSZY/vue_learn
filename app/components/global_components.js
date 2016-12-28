/**
 * Created by Apple on 16/12/26.
 */
const Vue = require("vue");
//require("../node_modules/bootstrap-datetimepicker/js/bootstrap-datetimepicker");
var fakeLoader = Vue.extend({
    "template":'<div class="fakeloader6" style="position:fixed; width:100%; height:100%;background-color:#dee1e2;z-index: 9999;opacity: 0.7">'+
                '<div class="fl spinner2"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>'+
                '</div>'
})

Vue.component("fake-loader",fakeLoader);

var dateRangeTemplate = `<div><select class="form-control">{options}</select>
                <input type='datetime' style='width:140px' class='dateRangeBegin txtSetDate form-control' disabled='disabled'/> -
                <input type='datetime' style='width:140px' class='dateRangeEnd txtSetDate form-control' disabled='disabled'/>
                <button type='button' class='btn' style='display:none'>转到</button></div>`
var dateRange = Vue.extend({
    "template":dateRangeTemplate,
    "mounted":function() {
        var self = this;
        $(this.$el).dateRange(function (event, begin, end) {
         this.dateRange = {
         "begin": begin,
         "end": end,
         };
         }.bind(this), dateRangeTemplate,this.minView);
        $('input.txtSetDate').each(function (index, item) {
            $(item).datetimepicker({
                format: self.format || "yyyy-mm-dd",
                weekStart: 1,
                todayBtn:  1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                forceParse: 0,
                showMeridian: 1,
                minView:self.minView || 2,
            });
        });
        $(this.$el).on("dateRangeChanged",function (event,data) {
            console.log(event)
        })
    },
    "props":["minView"],
    "watch":{
        "dateRange": function (val, oldVal) {
            console.log(val)
        }
    }
})

Vue.component("date-range",dateRange);