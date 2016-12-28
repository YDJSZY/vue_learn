function formatString(s, data) {
    for(var prop in data) {
        if(data.hasOwnProperty(prop)) {
            s = s.split("{" + prop + "}").join(data[prop]);
        }
    }
    return s;
}

function zip(array1, array2) {
    var l = [];
    for(var i = 0; i < array1.length; ++i) {
        l.push([array1[i], array2[i]]);
    }
    return l;
}

function mixin() {
    var args = Array.prototype.slice.call(arguments);
    var mainObject = args.shift();//删除第一个元素并返回
    while(args.length > 0) {
        var t = args.shift();
        for(var prop in t) {
            if(t.hasOwnProperty(prop)) {
                var v = t[prop];
                if(typeof(v) == "function") {
                    v = v.bind(mainObject);
                }
                mainObject[prop] = v;
            }
        }
    }
}

function getTemplate(templateName){
    var tag = $(templateName);
    return tag.text();
}

function formatDate(datetime, format) {
    if(typeof(datetime) === "string") {
        return datetime;
    }
    if(typeof(datetime) === "number") {
        datetime = new Date(datetime);
    }
    if(!(datetime instanceof Date)) {
        console.debug(datetime, typeof(datetime));
    }
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    var day = datetime.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    format = format || "{0}-{1}-{2}";
    var result = formatString(format, [year, month, day]);
    result = formatString(result, {
        "year": year,
        "month": month,
        "day": day
    });
    return result === "NaN-NaN-NaN" ? "" : result;
}

/**
 * 把时间格式化成 09:18 这样的形式。
 * @param datetime
 * @returns
 */
function formatTime(datetime) {
    var hour = datetime.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }
    var minute = datetime.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    return formatString("{0}:{1}", [hour, minute]);
}

function formatDateTime(datetime) {
    return formatDate(datetime) + " " + formatTime(datetime);
}

/**
 * 把已经过去的时间转换成方便人类阅读的
 * @param datetime
 * @returns
 */
function toHumanReadTime(datetime) {
    var delta = (new Date()).getTime() - datetime.getTime();
    //先处理小于60秒，以及未来时间的情况。
    if (delta < 1000) {
        return "刚刚";
    } else if (delta < 60 * 1000) {
        return formatString("{0}秒之前", [Math.floor(delta / 1000)]);
    }
    delta = parseInt(delta / (1000 * 60)); //按分钟来计算。
    if (delta < 60) {
        return formatString("{0}分钟前", [Math.floor(delta)]);
    } else if (delta < 60 * 24) {
        return formatString("{0}小时{1}分钟前", [Math.floor(delta / 60), delta % 60]);
    } else if ((delta % (60 * 24)) < 60) { //刚好XX天整。
        return formatString("{0}天前", [Math.floor(delta / (60 * 24))])
    } else {
        return formatString("{0}天{1}小时前", [Math.floor(delta / (60 * 24)), Math.floor((delta % (60 * 24)) / 60)]);
    }
}

function toCurrency(f) {
    try {
        return parseFloat(f).toFixed(1);
    } catch (e) {
        return "0";
    }
}

function percent(n, total) {
    if(total == 0) {
        return "NaN";
    }
    var t = n / total * 100;
    if(typeof(t) != "number") {
        return "NaN";
    }
    if(isFinite(t)) {
        return formatString("{0}%", [parseFloat(t).toFixed(1)]);
    } else {
        return new String(t);
    }
}

function weekdayName(day) {
    if(day == 1) {
        return "周一";
    } else if (day == 2) {
        return "周二";
    } else if (day == 3) {
        return "周三";
    } else if (day == 4) {
        return "周四";
    } else if (day == 5) {
        return "周五";
    } else if (day == 6) {
        return "周六";
    } else if (day == 7) {
        return "周天";
    }
    return "";
}

function dateName(date) {
    var array = date.split('-');
    return array[0]+'月'+array[1]+'号';
}

function min() {
    var result = NaN;
    for(var i = 0; i < arguments.length; ++i) {
        if(isNaN(result)) {
            result = arguments[i];
        } else {
            if(result > arguments[i]) {
                result = arguments[i];
            }
        }
    }
    return result;
}

function max() {
    var result = NaN;
    for(var i = 0; i < arguments.length; ++i) {
        if(isNaN(result)) {
            result = arguments[i];
        } else {
            if(result < arguments[i]) {
                result = arguments[i];
            }
        }
    }
    return result;
}

/**
 * 从列表中找到最小的那个项。
 * 如果getkey是一个函数，传入这个函数当前元素，要求返回它的一个属性，再进行比较。
 */
function chooseMinimalOne(list, getkey){
    var keys = [];
    var values = [];
    for(var i=0; i < list.length; ++i){
        var key;
        if(getkey){
            key = getkey(list[i]);
        } else {
            key = list[i];
        }
        keys.push(key);
        values.push(list[i]);
    }
    var minimalKey = Math.min.apply(Math, keys);
    for(var i=0; i < keys.length; ++i){
        if(keys[i] == minimalKey){
            return values[i];
        }
    }
    return null;
}


function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

function isScrolledIntoView(elem){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return (elemBottom >= docViewTop) && (elemTop <= docViewBottom);
}


function firstSecond(date,fromSelect,minView) {
    if(!date){
        return '';
    }
    var d = new Date(date);
    if(!fromSelect){
        if(minView !== "0"){
            d.setHours(0);
            d.setMinutes(0);
            d.setSeconds(0);
            d.setMilliseconds(0);
        }
        return d;
    }
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return d;
}

function lastSecond(date,fromSelect,minView) {
    if(!date){
        return '';
    }
    var d = new Date(date);
    if(!fromSelect){
        if(minView !== "0"){
            d.setHours(23);
            d.setMinutes(59);
            d.setSeconds(59);
            d.setMilliseconds(999);
        }
        return d;
    }
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    d.setMilliseconds(999);
    return d;
}

var findObjectById = function (objectList, id) {
    for(var i = 0; i < objectList.length; ++i) {
        var obj = objectList[i];
        if(obj.id == id) {
            return obj;
        }
    }
    return null;
};

var findObjectIndexById = function (objectList, id) {
    for(var i = 0; i < objectList.length; ++i) {
        var obj = objectList[i];
        if(obj.id == id) {
            return i;
        }
    }
    return null;
};

/**
 * 显示分页，使用方法：
 * function showPage(pageNumber){
 * }
 *
 * var pageList = new PageList(showPage, pageSize);
 * pageList.setTotal(5); //总共五页
 * pageList.setCurrent(1); //当前第一页
 * pageList.render('#divPagination'); //显示分页用的div
 *
 */
var PageList = function(callback, pageSize) {
    this.init(callback, pageSize);
};
$.extend(PageList.prototype, {
    total : 1,
    callback : undefined,
    current : 1,

    init : function(callback, pageSize) {
        this.callback = callback || genericShowPage;
        this.pageSize = pageSize || 20; //pageSize defaults to 20.
    },

    setTotal : function(total) {
        this.total = Math.ceil(total);
        if (this.total == 0) {
            this.total = 1;
        }
    },

    setCurrent : function(current) {
        if (current < 1) {
            console.info("当前页不能在第一页之前");
            current = 1;
        } else if (current > this.total) {
            console.info("当前页不能在第一页之后");
            current = this.total;
        }
        this.current = current;
    },

    getCurrent : function() {
        return this.current;
    },

    render : function(target) {
        target = $(target);
        var html = target.is("ul") ? "" : "<ul class='pagination'>";
        if (this.current <= 1) {
            html += "<li class='disabled'><a><i class='fa fa-fast-backward'></i></a></li>";
            html += "<li class='disabled'><a><i class='fa fa-arrow-left'></i></a></li>";
        } else {
            html += "<li><a href='#' data-goto-page='1' class='anchorShowPage fa fa-fast-backward'></a></li>";
            html += formatString("<li><a href='#' data-goto-page='{0}' class='anchorShowPage fa fa-arrow-left'></a></li>", [this.current - 1]);
        }
        for (var i = 1; i <= this.total; ++i) {
            if (i == this.current) {
                html += formatString("<li class='disabled current'><a style='background-color:#428BCA;color:#fff'>{0}</a></li>", [i]);
            } else if(Math.abs(this.current - i) < 4){
                html += formatString("<li><a href='#' class='anchorShowPage' data-goto-page='{0}'>{0}</a></li>", [i]);
            }
        }
        if (this.current >= this.total) {
            html += "<li class='disabled'><a><i class='fa fa-arrow-right'></i></a></li>";
            html += "<li class='disabled'><a><i class='fa fa-fast-forward'></i></a></li>";
        } else {
            html += formatString("<li><a href='#' class='anchorShowPage fa fa-arrow-right' data-goto-page='{0}'></a></li>", [~~this.current + 1]);
            html += formatString("<li><a href='#' class='anchorShowPage fa fa-fast-forward' data-goto-page='{0}'></a></li>", [this.total]);
        }
        if(!target.is("ul")) {
            html += "</ul>";
        }
        target.html(html);
        $("a.anchorShowPage", target).click(this.showPage.bind(this));
    },

    showPage : function(e) {
        var nextPage = $(e.target).attr('data-goto-page');
        this.callback(nextPage);
        e.preventDefault();
    }
});

function genericShowPage(page) {
    var uri = new Uri(window.location);
    uri.replaceQueryParam("page", page);
    window.location = uri.toString();
}


var dateRangeSelectorTemplate = "<select>{options}</select>";
dateRangeSelectorTemplate += "<input type='datetime' class='dateRangeBegin' disabled='disabled'/> -";
dateRangeSelectorTemplate += "<input type='datetime' class='dateRangeEnd' disabled='disabled'/>";
dateRangeSelectorTemplate += "<button type='button' class='btn' style='display:none'>转到</button>";

var DateRangeSelector = function (template,minView){
    if(template) {
        this.template = template;
    }
    this.init(minView);
};

$.extend(DateRangeSelector.prototype, {
    template: dateRangeSelectorTemplate,
    beginDate: null,
    endDate: null,
    dateRangeName: null,
    target: null,
    instantly: true,
    namedDateRanges: [
        "今天",
        "昨天",
        "前天",
        "本周",
        //"本周工作日",
        "上周",
        //"上周工作日",
        "本月份",
        "上个月",
        "最近三个月",
        "上个季度",
        "最近一年",
        "本季度",
        "本年度",
        "上一年度",
        "不限",
        "自定义"
    ],

    init: function (minView) {
        this.dateRangeName = "今天";
        this._setDateRangeName();
        this.minView = minView;
    },
    render: function (target) {
        this.target = $(target);
        var options = "";
        for (var i = 0; i < this.namedDateRanges.length; ++i) {
            if(this.dateRangeName == this.namedDateRanges[i]) {
                options += formatString("<option selected>{0}</option>", [this.namedDateRanges[i]]);
            } else {
                options += formatString("<option>{0}</option>", [this.namedDateRanges[i]]);
            }
        }
        var html = formatString(this.template, {"options": options});
        this.target.html(html);
        var dateRangeSelector = $("select", this.target);
        var dateRangeBegin = $("input.dateRangeBegin", this.target);
        var dateRangeEnd = $("input.dateRangeEnd", this.target);
        var button = $("button", this.target);
        dateRangeSelector.on("change", this.__doChangeName.bind(this));
        button.on("click", this._doChange.bind(this));
        dateRangeBegin.on("change", this._doChange.bind(this));//给开始日期的input绑定change事件
        dateRangeEnd.on("change", this._doChange.bind(this));
        dateRangeBegin.val(formatDate(this.beginDate));
        dateRangeEnd.val(formatDate(this.endDate));
        button.hide();
        dateRangeBegin.prop("disabled", true);
        dateRangeEnd.prop("disabled", true);
        return this.target;
    },

    getBeginDate: function () {
        return this.beginDate;
    },
    getEndDate: function () {
        return this.endDate;
    },

    /**
     * 返回当前选择的日期区间名称。
     */
    getDateRangeName: function () {
        return this.dateRangeName;
    },

    /**
     * 返回一个JSON，用于提交给后端。
     */
    asJson: function () {
        return {
            "start_time": this.beginDate.getTime(),
            "end_time": this.endDate.getTime()
        };
    },
    setDateRangeName: function (name) {
        this._doChangeName(name);
    },
    setDateRange: function (begin, end) {
        var found = false;
        var begin_, end_;
        var name;
        var dateRangeSelector = null;

        this.beginDate = firstSecond(begin);
        this.endDate = lastSecond(end);

        if(this.target) {
            dateRangeSelector = $("select", this.target);
            var dateRangeBegin = $("input.dateRangeBegin", this.target);
            var dateRangeEnd = $("input.dateRangeEnd", this.target);
            dateRangeSelector.val(this.namedDateRanges[i]);
            dateRangeBegin.val(formatDate(this.beginDate));
            dateRangeEnd.val(formatDate(this.endDate));
        };

        //根据每个名称的时间范围匹配一下到底用哪个名称。
        for (var i = 0; i < this.namedDateRanges.length - 1; ++i) { //最后的“自定义”不算。
            name = this.namedDateRanges[i];
            t = dateNameToRange(name);
            begin_ = t[0], end_ = t[1];
            var compare = function(d1, d2) {
                var delta = d1.getTime() - d2.getTime();
                return delta > -1000 && delta < 1000;
            };
            if (compare(begin_, this.beginDate) && compare(end_, this.endDate)) {
                this.dateRangeName = name;
                if(dateRangeSelector) {
                    dateRangeSelector.val(name);
                }
                found = true;
                break;
            }
        }
        //如果实在没有，那就是自定义类型了。
        if (!found) {
            this.dateRangeName = "自定义";
            if(dateRangeSelector) {
                dateRangeSelector.val("自定义");
            }
        }
    },

    _doChange: function (){
        var dateRangeBegin = $("input.dateRangeBegin", this.target);
        var dateRangeEnd = $("input.dateRangeEnd", this.target);
        var begin = new Date(dateRangeBegin.val());
        var end = new Date(dateRangeEnd.val());
        if (begin > end) {
            var t = end;
            end = begin;
            begin = t;
        }
        this.beginDate = firstSecond(begin,false,this.minView);
        this.endDate = lastSecond(end,false,this.minView);
        this.target.trigger("dateRangeChanged", [this.beginDate, this.endDate]);
    },

    __doChangeName: function (event) {
        this._doChangeName();
    },

    _doChangeName: function (name) {
        var dateRangeSelector = null;
        if(!!name) {
            if(!this._isDateRangeName(name)) {
                return;
            }
            this.dateRangeName = name;
            dateRangeSelector = $("select", this.target);
            dateRangeSelector.val(name);
            this._setDateRangeName();
        } else if(this.target){
            dateRangeSelector = $("select", this.target);
            this.dateRangeName = dateRangeSelector.val();
            this._setDateRangeName();
        }
        if(!this.target) { // XXX 这句话不是应该写到前面去吗？
            return;
        }

        var dateRangeBegin = $("input.dateRangeBegin", this.target);
        var dateRangeEnd = $("input.dateRangeEnd", this.target);
        var button = $("button", this.target);
        //根据begin/end填充两个文本框的值。
        dateRangeBegin.val(formatDate(this.beginDate));
        dateRangeEnd.val(formatDate(this.endDate));
        $('.txtSetDate').each(function (index, item) {
            $(item).show()
        })
        if (this.dateRangeName == "自定义") {
            dateRangeBegin.prop("disabled", false);
            dateRangeEnd.prop("disabled", false);
            button.show();
        } else {
            dateRangeBegin.prop("disabled", true);
            dateRangeEnd.prop("disabled", true);
            this.target.trigger("dateRangeChanged", [this.beginDate, this.endDate]);
            button.hide();
        }
        if(this.dateRangeName == "不限"){
            $('.txtSetDate').each(function (index, item) {
                $(item).hide()
            })
        }
    },

    _setDateRangeName: function (){
        var t = dateNameToRange(this.dateRangeName);
        this.beginDate = t[0];
        this.endDate = t[1];
    },

    _isDateRangeName: function(name) {
        var found = false;
        for(var i = 0; i < this.namedDateRanges.length; ++i) {
            if(this.namedDateRanges[i] == name) {
                return true;
            }
        }
        return false;
    }
});

$.fn.extend({
    dateRange: function (handler, template,minView) {
        return this.map(function (){
            var p = $(this);
            var t = p.data("dateRangeSelector");
            if(!t) {
                t = new DateRangeSelector(template,minView);
                var p = t.render(this);
                p.data("dateRangeSelector", t);
                if(handler) {
                    p.on("dateRangeChanged", handler);
                }
            }
            return t;
        });
    }
});

function getDateRange(target) {
    return $(target).dateRange().get()[0];
}

function dateNameToRange(name) {
    var t, now = new Date();
    var begin, end;
    var yang = new MrYangUtil();//返回当前时间
    switch (name) {
    case "今天", "自定义":
        begin = new Date(now.getFullYear(), now.getMonth(), now.getDate());//年月日
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate());//年月日
        break;
    case "昨天":
        t = yang.getYesterday();
        begin = t;
        end = t;
        break;
    case "前天":
        t = yang.getTwoDaysAgo();
        begin = t;
        end = t;
        break;
    case "本周":
        t = yang.getCurrentWeek();
        begin = t[0];
        end = t[1];
        break;
    case "上周":
        t = yang.getPreviousWeek();
        begin = t[0];
        end = t[1];
        break;
    case "本月份":
        t = yang.getCurrentMonth();
        begin = t[0];
        end = t[1];
        break;
    case "上个月":
        t = yang.getPreviousMonth();
        begin = t[0];
        end = t[1];
        break;
    case "最近三个月":
        t = yang.getLastThreeMonths();
        begin = t[0];
        end = t[1];
        break;
    case "最近一年":
        t = yang.getLastYear();
        begin = t[0];
        end = t[1];
        break;
    case "本季度":
        t = yang.getCurrentSeason();
        begin = t[0];
        end = t[1];
        break;
    case "上个季度":
        t = yang.getPreviousSeason();
        begin = t[0];
        end = t[1];
        break;
    case "本年度":
        t = yang.getCurrentYear();
        begin = t[0];
        end = t[1];
        break;
    case "上一年度":
        t = yang.getPreviousYear();
        begin = t[0];
        end = t[1];
        break;
    case "不限":
        begin = '';
        end = '';
        break;
    default:
        begin = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
    }
    begin = firstSecond(begin,true);
    end = lastSecond(end,true);
    return [ begin, end ];
}

var MrYangUtil = function() {
    this.getCurrentDate = function() {
        return new Date();
    };//返回当前时间

    this.getCurrentWeek = function() {
        var currentDate = this.getCurrentDate();
        var week = currentDate.getDay();

        var millisecond = 1000 * 60 * 60 * 24;
        var minusDay = week != 0 ? week - 1 : 6;
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        return [ monday, sunday ];
    };

    this.getCurrentMonth = function() {
        var currentDate = this.getCurrentDate();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var firstDay = new Date(currentYear, currentMonth, 1);

        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0;
        } else {
            currentMonth++;
        }

        var millisecond = 1000 * 60 * 60 * 24;
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        return [ firstDay, lastDay ];
    };

    this.getQuarterSeasonStartMonth = function(month) {
        var spring = 0;
        var summer = 3;
        var fall = 6;
        var winter = 9;

        if (month < 3) {
            return spring;
        } else if (month < 6) {
            return summer;
        } else if (month < 9) {
            return fall;
        } else {
            return winter;
        }
    };

    this.getMonthDays = function(year, month) {
        var relativeDate = new Date(year, month, 1);
        var relativeMonth = relativeDate.getMonth();
        var relativeYear = relativeDate.getFullYear();

        if (relativeMonth == 11) {
            relativeYear++;
            relativeMonth = 0;
        } else {
            relativeMonth++;
        }
        var millisecond = 1000 * 60 * 60 * 24;
        var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
        return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
    };

    this.getCurrentSeason = function() {
        var currentDate = this.getCurrentDate();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
        var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;
        var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
        var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
        return [ quarterSeasonStartDate, quarterSeasonEndDate ];
    };

    this.getCurrentYear = function() {
        var currentDate = this.getCurrentDate();
        var currentYear = currentDate.getFullYear();

        var currentYearFirstDate = new Date(currentYear, 0, 1);
        var currentYearLastDate = new Date(currentYear, 11, 31);
        return [ currentYearFirstDate, currentYearLastDate ];
    };

    this.getPriorMonthFirstDay = function(year, month) {
        if (month == 0) {
            month = 11;
            year--;
            return new Date(year, month, 1);
        }
        month--;
        return new Date(year, month, 1);
    };

    this.getPreviousMonth = function() {
        var currentDate = this.getCurrentDate();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
        var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
        return [ priorMonthFirstDay, priorMonthLastDay ];
    };

    this.getPreviousWeek = function() {
        var currentDate = this.getCurrentDate();
        var week = currentDate.getDay();
        var millisecond = 1000 * 60 * 60 * 24;
        var minusDay = week != 0 ? week - 1 : 6;
        var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
        var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
        var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));
        return [ priorWeekFirstDay, priorWeekLastDay ];
    };

    this.getPriorSeasonFirstDay = function(year, month) {
        var spring = 0;
        var summer = 3;
        var fall = 6;
        var winter = 9;
        if (month < 3) {
            --year;
            month = winter;
        } else if (month < 6) {
            month = spring;
        } else if (month < 9) {
            month = summer;
        } else {
            month = fall;
        }
        return new Date(year, month, 1);
    };

    this.getPreviousSeason = function() {
        var currentDate = this.getCurrentDate();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        var priorSeasonFirstDay = this.getPriorSeasonFirstDay(currentYear, currentMonth);
        var priorSeasonLastDay = new Date(priorSeasonFirstDay.getFullYear(), priorSeasonFirstDay.getMonth() + 2, this.getMonthDays(priorSeasonFirstDay.getFullYear(),
            priorSeasonFirstDay.getMonth() + 2));
        return [ priorSeasonFirstDay, priorSeasonLastDay ];
    };

    this.getPreviousYear = function() {
        var currentDate = this.getCurrentDate();
        var currentYear = currentDate.getFullYear() - 1;
        var priorYearFirstDay = new Date(currentYear, 0, 1);
        var priorYearLastDay = new Date(currentYear, 11, 31);
        return [ priorYearFirstDay, priorYearLastDay ];
    };

    this.getYesterday = function() {
        var currentDate = this.getCurrentDate();
        var yesterday = new Date(currentDate.getTime() - 1000 * 60 * 60 * 24);
        return yesterday;
    };

    this.getTwoDaysAgo = function () {
        var today = new Date();
        var twoDaysAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 2);
        return twoDaysAgo;
    };

    this.getLastThreeMonths = function () {
        var today = new Date();
        var ninetyDaysAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 90);
        var theFirstDay = new Date(ninetyDaysAgo.getFullYear(), ninetyDaysAgo.getMonth(), 1);
        return [theFirstDay, today];
    };

    this.getLastYear = function () {
        var today = new Date();
        var aYearAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 365);
        var theFirstDay = new Date(aYearAgo.getFullYear(), aYearAgo.getMonth(), 1);
        return [theFirstDay, today];
    };
};

var ErrorList = function () {
    $.extend(this, {
        errorList: [],

        add: function (message) {
            this.errorList.push(message);
        },

        require:  function (value, fieldName) {
            if(!value && value!==0) {
                this.errorList.push(formatString("需要填写{0}字段。", [fieldName]));
                return false;
            }
            return true;
        },

        requireNumber: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            var t = parseFloat(value);
            if(!isFinite(t)){
                this.errorList.push(formatString("{0}字段需要是一个数字。", [fieldName]));
                return false;
            }
            return true;
        },

        requirePositiveNumber:  function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            if(!this.requireNumber(value, fieldName)){
                return false;
            }
            var t = parseFloat(value);
            if(t < 0) {
                this.errorList.push(formatString("{0}需要是一个正数。", [fieldName]));
                return false;
            }
            return true;
        },

        requireInteger: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            var t = parseInt(value);
            if(!isFinite(t)) {
                this.errorList.push(formatString("{0}需要是一个整数。", [fieldName]));
                return false;
            }
            return true;
        },

        requirePositiveInteger: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            if(!this.requireInteger(value, fieldName)){
                return false;
            }
            var t = parseInt(value);
            if(t < 0) {
                this.errorList.push(formatString("{0}需要是一个正数。", [fieldName]));
                return false;
            }
            return true;
        },

        requireDate: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            return true;
        },

        requireDateTime: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            return true;
        },

        requireUrl: function (value, fieldName, allow_null) {
            if(allow_null && !value) {
                return true;
            }
            if(!this.require(value, fieldName)){
                return false;
            }
            return true;
        },

        isEmpty: function () {
            return this.errorList.length == 0;
        },

        hasError: function () {
            return this.errorList.length > 0;
        },

        getValue: function () {
            return this.errorList.join("\n");
        },
    });
}

function unique (collection, keyname) {
    var output = [],keys = [];
    for(var i = 0,l = collection.length; i < l; i++){
        var key = collection[i][keyname];
        if(keys.indexOf(key) === -1) {
            keys.push(key);
            output.push(collection[i]);
        }
    }
    return output;
}

function unique_(arr){
    var newArr = [],repeatArr = [],obj = {};
    for(var i = 0; i < arr.length; i++){
        if(newArr.indexOf(arr[i])!=-1){
            if(repeatArr.indexOf(arr[i])==-1) {
                repeatArr.push(arr[i]);
            }
        }
        else{
            newArr.push(arr[i]);
        }
    }
    obj = {
        "repeatArr":repeatArr,
        "repeat":repeatArr.length > 0 ? true : false,
        "newArr":newArr
    };
    return obj;
}//去除数组中重复的元素，另保存重复的元素