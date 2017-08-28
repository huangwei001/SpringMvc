/**
 * 时间控件
 *  param {
 *     id,           --> 弹出日历控件的id
 *     type,         --> year, month, day, hour,min
 *     formatter,    --> 格式化
 *     startNow,     --> 只可选择当前时间以后的时间（true/false）  （可选）
 *     position,     --> 日历弹出位置（默认下方，可选）
 *     gxlx,         --> 关系类型（start --> 当前日历是开始时间；end--> 当前日历是结束时间）（可选）
 *     id2,          --> 对应日期控件Id(如本控件是开始时间控件，则id2就是结束时间的控件) （可选，当gxlx存在时，必选）
 *     ...           --> 本日历控件支持的其他属性，可通过文档查找
 *
 *     如： endDate, startDate等
 *
 *  }
 *  @author liupj
 *
 */
;(function (window) {
    window.initDatePicker = function (param) {
        if (!param.id && !param.type && !param.formatter) {
            throw new Error("id, type, formatter cannot be null.");
        }

        var params = _getDataPickerParam(param.type, param.formatter, param.startNow, param.position);

        params = $.extend({}, params, param);

        var $datePicker = $("#" + params.id);
        var $anotherDatePicker = $("#" + params.id2);

        $datePicker.datetimepicker(params);

        /*不存在关系类型，直接返回*/
        if (!params.gxlx) {
            return;
        }

        if (params.gxlx == "start") {
            $datePicker.on("click", function () {
                if (params.endDate) {
                    if ($anotherDatePicker.val() && params.endDate > $anotherDatePicker.val()) {
                        $datePicker.datetimepicker("setEndDate", $anotherDatePicker.val());
                    } else {
                        $datePicker.datetimepicker("setEndDate", params.endDate);
                    }
                } else {
                    if (!$anotherDatePicker.length) {
                        throw new Error("gxlx and id2 is null, or id2 is a invalid dom id. current: gxlx = " + params.gxlx + ", id2 = " + params.id2);
                    }

                    if ($anotherDatePicker.val()) {
                        $datePicker.datetimepicker("setEndDate", $anotherDatePicker.val());
                    }

                }
            });

            return;
        }

        if (params.gxlx == "end") {
            $datePicker.on("click", function () {
                if (params.startDate) {
                    if ($anotherDatePicker.val() && params.startDate < $anotherDatePicker.val()) {
                        $datePicker.datetimepicker("setStartDate", $anotherDatePicker.val());
                    } else {
                        $datePicker.datetimepicker("setStartDate", params.startDate);
                    }
                } else {
                    if (!$anotherDatePicker.length) {
                        throw new Error("gxlx and id2 is null, or id2 is a invalid dom id. current: gxlx = " + params.gxlx + ", id2 = " + params.id2);
                    }

                    if ($anotherDatePicker.val()) {
                        $datePicker.datetimepicker("setStartDate", $anotherDatePicker.val());
                    }
                }

            });
        }
    };

    /**
     *  startView(4:年,3:月,2:日,1:时,0:分);
     *  minView(0:精确到分，1精确到小时，2：精确到日,3:精确到月，4：精确到年)
     *  maxView(4:最大展示年视图)
     * @param type
     * @param formatter
     * @param startNow
     * @param position
     * @returns {*}
     * @private
     */
    function _getDataPickerParam(type, formatter, startNow, position) {
        var nowRq;
        if (startNow) {
            nowRq = new Date();
        }
        var _dataPickerOptions = {
            year: {
                minView: 4,
                maxView: 4,
                startView: 4,
                format: formatter,
                language: 'zh-CN',
                /*todayBtn:true,*/
                autoclose: true,
                startDate: nowRq,
                pickerPosition: position
            },
            month: {
                minView: 3,
                maxView: 3,
                startView: 3,
                format: formatter,
                language: 'zh-CN',
                /*todayBtn:true,*/
                autoclose: true,
                startDate: nowRq,
                pickerPosition: position
            },
            day: {
                minView: 2,
                maxView: 4,
                startView: 2,
                format: formatter,
                language: 'zh-CN',
                /*todayBtn:true,*/
                autoclose: true,
                startDate: nowRq,
                pickerPosition: position
            },
            hour: {
                minView: 1,
                maxView: 2,
                startView: 2,
                format: formatter,
                language: 'zh-CN',
                /*todayBtn:true,*/
                autoclose: true,
                startDate: nowRq,
                pickerPosition: position
            },
            min: {
                minView: 0,
                maxView: 2,
                startView: 2,
                format: formatter,
                language: 'zh-CN',
                /*todayBtn:true,*/
                autoclose: true,
                startDate: nowRq,
                pickerPosition: position
            }
        };

        return _dataPickerOptions[type];
    }

})(window);


/**
 * 封装$.ajax, 返回的对象是deferred，可在此基础上关联done, fail事件
 */
;(function ($) {
    $.postJSON = function (url, data) {
        return $.ajax({
            url: url,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };

    $.putJSON = function (url, data) {
        return $.ajax({
            url: url,
            method: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };

    $.delJSON = function (url, data) {
        return $.ajax({
            url: url,
            method: "DELETE",
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };

})(jQuery);

/**
 * 将表单转成json,并且name为key,value为值
 */
;(function ($) {
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined){
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });

        return o;
    };
    
})(jQuery);


/**
 * 封装bootstrap modal弹出层
 * @author shixy
 * @author liupj
 */
;(function ($) {
    $.fn.beamDialog = function (options) {
        var defaults = {
            title: '标题',
            content: '',
            showCloseButton: true,
            otherButtons: [],
            otherButtonStyles: [],
            bootstrapModalOption: {show: false},
            height: 500,
            width: 400,
            animation: false,
            type: 2 //1:iframe 2:内容
        };

        options = $.extend(defaults, options);
        var modalID = '';

        //生成一个惟一的ID
        function random() {
            return Math.random() > 0.5 ? -1 : 1;
        }

        function getModalID() {
            return "beamDialog-" + ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Q', 'q', 'W', 'w', 'E', 'e', 'R', 'r', 'T', 't', 'Y', 'y', 'U', 'u', 'I', 'i', 'O', 'o', 'P', 'p', 'A', 'a', 'S', 's', 'D', 'd', 'F', 'f', 'G', 'g', 'H', 'h', 'J', 'j', 'K', 'k', 'L', 'l', 'Z', 'z', 'X', 'x', 'C', 'c', 'V', 'v', 'B', 'b', 'N', 'n', 'M', 'm'].sort(random).join('').substring(5, 20);
        }

        this.each(function () {
            var obj = $(this);
            modalID = getModalID();

            var tmpHtml;

            var modalClass = "modal";
            if (options.animation) {
                modalClass += " fade";
            }

            if (options.type == 1) {
                tmpHtml = '<div class="' + modalClass + '" id="{ID}" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div style="cursor:move" class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button><h6 class="modal-title">{title}</h6></div><div class="modal-body"></div><div class="modal-footer">{button}</div></div></div></div>';
            } else if (options.type == 2) {
                tmpHtml = '<div class="' + modalClass + '" id="{ID}" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div style="cursor:move" class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span></button><h6 class="modal-title">{title}</h6></div><div class="modal-body">{body}</div><div class="modal-footer">{button}</div></div></div></div>';
            }

            var buttonHtml = '<button class="btn btn-primary-close" data-dismiss="modal" aria-hidden="true">关闭</button>';
            if (!options.showCloseButton && options.otherButtons.length > 0) {
                buttonHtml = '';
            }
            //生成按钮
            var btnClass = 'cls-' + modalID;
            var buttonHtmlAdd = '';
            for (var i = 0; i < options.otherButtons.length; i++) {
                buttonHtmlAdd += '<button buttonIndex="' + i + '" class="' + btnClass + ' btn ' + options.otherButtonStyles[i] + '">' + options.otherButtons[i] + '</button>';
                if (i == options.otherButtons.length - 1) {
                    buttonHtml = buttonHtmlAdd + buttonHtml;
                }
            }
            //替换模板标记
            if (options.type == 1) {
                tmpHtml = tmpHtml.replace(/{ID}/g, modalID).replace(/{title}/g, options.title).replace(/{button}/g, buttonHtml);
                obj.append(tmpHtml);
                obj.find('.modal-body').empty();
                obj.find('.modal-body').load(options.content);
            } else if (options.type == 2) {
                var id = options.id || options.content;
                tmpHtml = tmpHtml.replace(/{ID}/g, modalID).replace(/{title}/g, options.title).replace(/{body}/g, document.getElementById(id).innerHTML).replace(/{button}/g, buttonHtml);
                obj.append(tmpHtml);

                $("#" + id).empty();
            }

            var modalObj = $('#' + modalID);

            if (options.width) {
                modalObj.css('width', options.width);
                modalObj.css('margin-left', function () {
                    if (/%/ig.test(options.width)) {
                        return -(parseInt(options.width) / 2) + '%';
                    } else {
                        return -($(this).width() / 2) + 'px';
                    }
                });
            }

            if (options.height) {
                modalObj.css('height', options.height);
                modalObj.css('margin-top', function () {
                    if (/%/ig.test(options.height)) {
                        return -(parseInt(options.height) / 2) + '%';
                    } else {
                        return -($(this).height() / 2) + 'px';
                    }
                });
                modalObj.find('.modal-body').css('height', options.height - 84 + 'px');
            }

            var modalOptions = $.extend(options.bootstrapModalOption, {show: false});

           modalObj.draggable({
                cursor: "move",
                handle: ".modal-header"
            });

            modalObj.modal(modalOptions);
        });

        var target = $("#" + modalID);
        var btnArray = [];
        for (var index = 0; index < options.otherButtons.length; index++) {
            var btn = target.find("[buttonindex=" + index + "]");
            if (btn) {
                btnArray.push(btn);
            }
        }

        target.btn = btnArray;
        target.form = $(target.find("form")[0]);

        var $title = target.find("div.modal-header > h6");

        target.title = function (title) {
            if (title) {
                $title.text(title);
            } else {
                return $title.text();
            }
        };


        //show
        target.show = function () {
            if(this.title() == "标题") {
                this.title(this.defaultTitle);
            }
          target.modal("show");
        };

        //hide
        target.hide = function () {
          target.modal("hide")
        };


        $(document).on("keydown", function(event) {
            if (event.keyCode == 27 && target) {
                target.modal("hide");
            }
        });


        return target;
    };

    $.extend({
        modal: function (options) {
            return $("body").beamDialog(options);
        }
    });

})(jQuery);

/**
 jQ向上滚动带上下翻页按钮
 */
;(function ($) {
    $.fn.extend({
        Scroll: function (opt, callback) {
            if (!opt) var opt = {};
            var _btnUp = $("#" + opt.up); //Shawphy:向上按钮
            var _btnDown = $("#" + opt.down); //Shawphy:向下按钮
            var _this = this.eq(0).find("ul:first");
            var lineH = _this.find("li:first").outerHeight(); //获取行高
            var line = opt.line ? parseInt(opt.line, 10) : parseInt(this.height() / lineH, 10); //每次滚动的行数，默认为一屏，即父容器高度
            var speed = opt.speed ? parseInt(opt.speed, 10) : 600; //卷动速度，数值越大，速度越慢（毫秒）
            var m = 0;  //用于计算的变量
            var count = _this.find("li").length; //总共的<li>元素的个数
            var upHeight = line * lineH;
            var showline = opt.showline;//显示多少行
            function scrollUp() {
                if (!_this.is(":animated")) {  //判断元素是否正处于动画，如果不处于动画状态，则追加动画。
                    if (m < count) {  //判断 m 是否小于总的个数
                        var go_count = count - m - showline;
                        if ((count - m) > showline) {
                            if (go_count < line) {
                                m += go_count;
                                upHeight = go_count * lineH;
                                _this.animate({marginTop: "-=" + upHeight + "px"}, speed);
                            } else {
                                m += line;
                                upHeight = line * lineH;
                                _this.animate({marginTop: "-=" + upHeight + "px"}, speed);
                            }
                        } else {


                        }
                    }
                }
            }

            function scrollDown() {
                if (!_this.is(":animated")) {
                    if (m > 0) {
                        if (m > line) { //判断m 是否大于一屏个数
                            m -= line;
                            upHeight = line * lineH;
                            _this.animate({marginTop: "+=" + upHeight + "px"}, speed);
                        } else {
                            upHeight = m * lineH;
                            m -= m;
                            _this.animate({marginTop: "+=" + upHeight + "px"}, speed);
                        }
                    }
                }
            }

            _btnUp.bind("click", scrollUp);
            _btnDown.bind("click", scrollDown);
        }
    });
})(jQuery);


/**
 * 进一步封装jquery-validate
 */
;(function ($) {

    //add by zhangying 20170824 start
    //提示信息
    $.extend($.validator.messages, {
        required: "该字段为必输项",
        remote: "请修正该字段的内容",
        email: "请输入一个正确的Email",
        url: "请输入一个正确的URL",
        date: "请输入一个正确的日期",
        dateISO: "请输入一个符合ISO规则的日期",
        number: "请输入一个正确的数字",
        digits: "只能输入整数",
        creditcard: "请输入一个合法的信用卡号",
        equalTo: "请再次输入相同的值",
        accept: "请输入一个符合要求的后缀",
        maxlength: $.validator.format("输入的字符不能超过 {0} 个"),
        minlength: $.validator.format("输入的字符不能小于 {0} 个"),
        rangelength: $.validator.format("输入的字符长度只能介于 {0} 和 {1} 之间"),
        range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: $.validator.format("请输入一个最大为{0} 的值"),
        min: $.validator.format("请输入一个最小为{0} 的值")
    });
    //add by zhangying 20170824 end

    /*************** 公用rules *******************/
    // 验证11位手机号  3-4位区号，7-8位直播号码，1－4位分机号
    $.validator.addMethod("phone", function (value, element) {
        var tel = /^((\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
        return this.optional(element) || (tel.test(value));
    }, "");

    //必填项验证输入全是空格
    $.validator.addMethod("noSpace", function (value, element) {
        return this.optional(element) || value.trim().length !== 0;
    }, "不能全为空格");

    // IP地址验证
    $.validator.addMethod("ip", function(value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址。");

    //add by zhangying 20170821 start
    //判断只能输入指定的字符
    $.validator.addMethod("maxLen", function (value, element, param) {
        var len = 0;
        var a;
        for(var i=0; i < value.length; i++) {
            a = value.charAt(i);
            if(a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
        }
        return this.optional(element) || len <= param;
    }, "输入的字符不能超过 {0} 个");
    //add by zhangying 20170821 end

    $.extend($.fn, {
        validator: function (params) {
            var defaultParams = {
                errorClass: "has-error",
                validClass: "has-success"
            };

            var targetParams = $.extend({}, params, defaultParams);

            for (var key in targetParams.rules) {
                if (!targetParams.tooltip_options || !targetParams.tooltip_options[key]) {
                    if (!targetParams.tooltip_options) {
                        targetParams.tooltip_options = {};
                    }
                    targetParams.tooltip_options[key] = {placement: 'bottom'};
                }
            }

            return this.validate(targetParams);
        }
    });

})(jQuery);

/**
 * 封装bootstrap-table
 *
 * 响应的数据格式： {"total":100, result:[{"id": "", "name": ""}]}
 * 请求附带参数：limit(每页记录数), offset(索引位，指从列表的第几条数据开始取，如第一页：offset--0, 第二页：2*limit), sort（排序字段）, order（asc/desc）
 *
 */
;(function (window) {
    var bt = {
        init: function (params) {
            var id = params.id;
            var target = $("#" + id);
            if (!target.length) {
                throw new Error("wrong id, current id = " + id);
            }

            if (!params.columns) {
                throw new Error("id, columns canot be null.");
            }


            var btTable = target.bootstrapTable({
                url: params.url,
                queryParams: function (parameters) {
                    var queryParams = params.queryParams;

                    if (queryParams) {
                        for (var key in queryParams) {
                            parameters[key] = queryParams[key];
                        }
                    }

                    return parameters;
                },

                loadData: params.loadData == undefined ? false : params.loadData,
                method: "post",
                cache: false,
                pagination: params.pagination == undefined ? true : params.pagination,
                sidePagination: "server",
                pageNumber: params.pageNumber || 1,
                pageSize: params.pageSize || 10,
                pageList: params.pageList || [10, 30, 100],
                striped: params.striped == undefined ? true : params.striped,
                showPaginationSwitch: params.showPaginationSwitch == undefined ? false : params.showPaginationSwitch, //显示或关闭分页的开关
                selectItemName: 'btSelectItem', //checkbox or radio group name
                search: false,
                escape: params.escape == undefined ? true : params.escape, //支持特殊字符转义
                showColumns: params.showColumns == undefined ? false : params.showColumns, //勾选显示所有列的下拉框

                rowStyle: params.rowStyle,

                footerStyle: params.footerStyle,

                clickToSelect: params.clickToSelect == undefined ? true : params.clickToSelect, //当选中行时checkbox或者radio自动选中
                height: params.height == undefined ? 0 : params.height,
                columns: params.columns,
                dataField: "result",
                totalField: params.totalField == undefined ? "total" : params.totalField,
                onPreBody: function(data){
                    assistantpageLogic.pageNo = this.pageNumber - 1;
                    assistantpageLogic.pageSize = this.pageSize;
                }
            });


            /**
             * refresh函数
             * @param options
             */
            btTable.refresh = function (options) {
                var defaultOptions = this.bootstrapTable('getOptions');

                this.bootstrapTable('refreshOptions', {
                    loadData: true,
                    pageNumber: 1,
                    url: options.url || defaultOptions.url,
                    queryParams: function (parameters) {
                        var queryParams = options;

                        if (queryParams) {
                            for (var key in queryParams) {
                                parameters[key] = queryParams[key];
                            }
                        }

                        if (parameters.url) {
                            delete parameters.url;
                        }

                        return parameters;
                    }
                });

            };

            /**
             * 设置bootstrap 表格高度
             */
            btTable.setHeight = function () {
                var that = this;
                this.bootstrapTable("resetView", {height: getHeight(that)});
            };


            btTable.on('load-success.bs.table', function () {
                btTable.setHeight();
            });


            return btTable;

        }
    };

    window.bt = bt;


    function getHeight(jqueryObj) {
        var tableTargetTop = jqueryObj.offset().top;
        var contentHeight = $('#page-content').find('.container-fluid').height();

        return contentHeight - tableTargetTop;
    }
})(window);


/**
 * 封装zTree
 */
;(function ($) {
    $.fn.tree = function (options) {
        var params = $.extend({}, $.fn.tree.defaultOptions, options);
        params.async.url = params.url;

        return this.zTree.init(this, params, null);
    };


    $.fn.tree.defaultOptions = {
        async: {
            enable: true,
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            dataType: "text",
            autoParam: ["id"]
        },

        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "", "N": ""},
            radioType: "all"
        },

        data: {
            key: {
                name: "name",
                checked: "checked",
                children: "children"
            },
            simpleData: {
                enable: false,
                idKey: "id",
                pIdKey: "pId",
                rootPid: null
            }
        }
    };


})(jQuery);


/**
 * 封装select下拉框,返回jquery对象，同时附带deferred属性，可以追加回掉函数
 *
 * params可传递以下参数：
 *
 * 说明： select组件支持异步请求获取数据和直接提供下拉框数据这两种形式
 *
 * 异步请求：
 *
 *      {
 *          url，                ----> 异步请求的url(POST请求，ContentType: application/json)
 *          data,                ----> 请求url附带的requestBody数据，格式为object
 *          textField,           ----> 下拉框text对应的key(默认为text， 即如果返回的json中key为text,则该属性可以省略)
 *          valueField,           ----> 下拉框value对应的key(默认为value， 即如果返回的json中key为value,则该属性可以省略)
 *          responseKey,         ---->  应对返回的数据格式不直接是下拉框的数据，如返回{msg: , httpStatus: 200, success: true, data: }, data对应的值才是下拉框需要的值。 此处responseKey制定为data
 *          headerKey,           ----> 给select增加的默认项
 *          headerValue          ----> 对应默认项的value
 *      }
 *
 *  直接提供下拉框数据：
 *
 *      {
 *          json,                ----> 下拉框数据，格式：[{text: 1, value: 2}]
 *          textField,           ----> 下拉框text对应的key(默认为text， 即如果返回的json中key为text,则该属性可以省略)
 *          valueField           ----> 下拉框value对应的key(默认为value， 即如果返回的json中key为value,则该属性可以省略)
 *          selectedValue        ----> 下拉框选中的对应的value(默认为空， 即如果没有选中的,则该属性可以省略)
 *      }
 *
 *
 */
;(function ($) {

    $.fn.select = function (params) {
        this.empty();
        params = $.extend({}, $.fn.select.defaultOptions, params);

        if (!params.textField || !params.valueField) {
            throw new Error("params must contain properties: textField and valueField");
        }

        if (params.json && params.json.length > 0) {
            appendSelectData(this, params);
            return this;
        }

        if (!params.url) {
            return this;
        }

        params.json = [];
        params.data = params.data || {};

        var deferred = $.ajax({
            url: params.url,
            data: JSON.stringify(params.data),
            type: "POST",
            dataType: "json",
            contentType: "application/json"
        });

        deferred.fail(function (response) {
            alert(JSON.stringify(response));
        });

        var that = this;
        //获得选中的值
        var selected = params.selectedValue;
        deferred.done(function (response) {
            if (!response) {
                return;
            }

            if (params.responseKey) {
                params.json = response[params.responseKey];
            } else {
                params.json = response;
            }
            appendSelectData(selected, that, params);
        });

        that.deferred = deferred;
        return that;
    };


    $.fn.select.defaultOptions = {
        textField: "text",
        valueField: "value",
        json: [],
        selectedValue: ""
    };

    function appendSelectData(selected, obj, params) {
        if (params.headerKey) {
            var val = params.headerValue || '';
            obj.append("<option value='" + val + "'>" + params.headerKey + "</option>");
        }

        $.each(params.json, function (index, val) {
            //判断是否选中
            if (selected == val[params.valueField]) {
                obj.append("<option value='" + val[params.valueField] + "' selected>" + val[params.textField] + "</option>");
            }else {
                obj.append("<option value='" + val[params.valueField] + "'>" + val[params.textField] + "</option>");
            }
        });
    }

    /**
     *
     * @param options {
     *      url
     * }
     */
    $.fn.selectTree = function (options) {
        var setting = $.extend({}, $.fn.selectTree.defaultSetting, options);

        var obj = $.fn.zTree.getZTreeObj(this.get(0).id + "_tree");

        if (obj) {
            return obj;
        }


        if (!setting.async.url && !setting.url) {
            throw new Error("options.url must set.");
        }

        setting.async.url = setting.url;

        //目标元素Id
        var id = this.get(0).id;
        var hiddenId = id + "_hidden";

        //树id
        var treeId = id + "_tree";
        //包含树的div id
        var treeDivId = treeId + "_div";


        this.attr("readonly", "readonly");

        var template = [];
        template.push('<div id="' + treeDivId + '" class="selectTree" style="display: none;">');
        template.push('<input type="hidden" id="' + hiddenId + '"/>');
        template.push('     <div class="portlet box green treeLeft">');
        template.push('         <div class="portlet-title line tree-title" style="text-align: right">');
        template.push('             <button type="button" class="btn red">确 定</button><span style="margin-left: 10px;"></span>');
        template.push('             <button type="button" class="btn red" id="clearDanw">清 除</button>');
        template.push('         </div>');
        template.push('         <div class="portlet-body">');
        template.push('             <ul id="' + treeId + '" class="ztree">');
        template.push('         </div>');
        template.push('     </div>');
        template.push('</div>');

        this.after(template.join(""));


        var onBodyDown = function (event) {
            if ($(event.target).parents(".selectTree").length == 0) {
                hideMenu();
            }
        };

        var hideMenu = function () {
            $("body").off("mousedown", onBodyDown);
            $(".selectTree").fadeOut("fast");
        };

        $("#" + treeDivId).find("div.portlet-title.line > button:first").on("click", hideMenu);



        $($("#" + treeDivId).find("div.portlet-title.line > button").get(1)).on("click", function () {
            var ztreeObj = $.fn.zTree.getZTreeObj(id + "_tree");
            ztreeObj.checkAllNodes(false);
            ztreeObj.reAsyncChildNodes(null, "refresh");

            ztreeObj.ids = "";
            $("#" + id).val("");




            hideMenu();
        });

        this.on("click", function (event) {
            $(".selectTree").fadeOut("fast");
            $("#" + treeDivId).slideDown("fast");
            $("body").on("mousedown", onBodyDown);
            event.stopPropagation();
        });

        return $.fn.zTree.init($("#" + treeId), setting, null);
    };

    $.fn.selectTree.defaultSetting = {
        async: {
            enable: true,
            type: "post"
        },

        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {"Y": "", "N": ""}
        },

        callback: {
            onCheck: function (e, treeId) {
                var zTree = $.fn.zTree.getZTreeObj(treeId),
                    nodes = zTree.getCheckedNodes(true),
                    name = "",
                    ids = "";

                var nameKey = zTree.setting.data.key.name;
                var idKey = zTree.setting.data.simpleData.idKey;

                for (var i = 0, l = nodes.length; i < l; i++) {
                    name += nodes[i][nameKey] + ",";
                    ids += nodes[i][idKey] + ",";
                }
                if (name.length > 0) {
                    name = name.substring(0, name.length - 1);
                    ids = ids.substring(0, ids.length - 1);
                }

                zTree.ids = ids;
                $("#" + treeId.substring(0, treeId.length - 5)).val(name);
            }
        },
        data: {
            key: {
                name: "name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pId"
            }
        }
    };


})(jQuery);

/**
 * 延迟调用函数
 *
 * condition: 条件判断函数，当返回true时，正式执行延迟
 * callback: 调用的目标函数
 * mills: 每多少毫秒尝试条件
 *
 */
;(function($) {
    $.delay = function (condition, callback, mills) {
        mills = mills || 0;

        var interval = setInterval(function() {
            if (condition()) {
                callback();
                clearInterval(interval);
            }
        }, mills);
    };
})(jQuery);

/**
 * masterpage: 主页面对象
 */
;(function (window) {
    var masterpage = {
        init: function () {
            var that = this;

            $(document).ready(function () {
                if (window.pageLogic) {
                    that.pageInit(pageLogic.init, pageLogic);
                }
            });
        },

        pageInit: function (initObj, caller) {
            var func = null,
                caller = caller || this;

            var container = $("body");
            if ($.isPlainObject(initObj)) {
                container.css("visibility", "hidden");
                setTimeout(function () {
                    for (var key in initObj) {
                        func = initObj[key];
                        if ($.isFunction(func)) {
                            try {
                                func.call(caller);
                            } catch (e) {
                                throw new Error("页面初始化[" + key + "]发生错误：" + e.message);
                            }
                        }
                    }
                    container.css("visibility", "visible");
                }, 0);
            }
        }
    };

    window.masterpage = masterpage;
})(window);

/**
 * assistantpage: 副页面对象
 */
;(function (window) {
    var assistantpage = {
        init: function () {
            var that = this;

            $(document).ready(function () {
                if (window.assistantpageLogic) {
                    that.pageInit(assistantpageLogic.init, assistantpageLogic);
                }
            });
        },

        pageInit: function (initObj, caller) {
            var func = null,
                caller = caller || this;

            var old = $("div[id^='beamDialog-']");

            if (old.size() > 0) {
                old.remove();
            }

            if ($.isPlainObject(initObj)) {
                setTimeout(function () {
                    for (var key in initObj) {
                        func = initObj[key];
                        if ($.isFunction(func)) {
                            try {
                                func.call(caller);
                            } catch (e) {
                                throw new Error("页面初始化[" + key + "]发生错误：" + e.message);
                            }
                        }
                    }
                }, 0);
            }
        }
    };

    window.assistantpage = assistantpage;
})(window);

/**
 * 封装报表统计
 *
 * options {
 *      url： xhr url,
 *      data: xhr data,
 *      columns: 缺省columns,
 *      lineEndTotal: true, -- 缺省显示行统计
 *      total: true, -- 缺省显示统计行
 *      formatters: {} --方法
 *      hide: {} --隐藏列字段
 *      class: xhr --columns的样式
 * },
 *
 * 返回的jquery对象包含了以下属性： {
 *
 *  deferred            ---> 延迟队列对象，用来附加额外任务
 *  dataSource         ---> 表格数据对象，数据格式 // [[来源, 路基, 路面],
                                                 // [手机, 2, 3],
                                                 // [合计, 2, 3]]
    setting            ---> 初始参数对象
 *
 * }
 *
 *
 */
;(function($) {
    $.fn.report = function (options) {
        var defaults = {
            data: {},
            columns: [],
            lineEndTotal: true,
            total: true
        };

        var params = jQuery.extend({}, {}, defaults, options);

        var deferred = $.ajax({
            url: params.url,
            data: JSON.stringify(params.data),
            dataType: "json",
            type: "POST",
            contentType: "application/json"
        });


        //将延迟对象作为jquery对象的属性输出，可用来附加额外任务
        this.deferred = deferred;
        var that = this;

        //创建表格并显示
        deferred.done(function (response) {
            response = response.data;
            //定义表格columns数组
            var columns = params.columns;
            //表格头
            var header = response[0];
            //表格体数据集
            var dataRows = response.slice(1);

            for (var key in header) {
                //定义变量，存放单列数据
                var column = {};
                if (header.hasOwnProperty(key)) {
                    if (params.hide != null && params.hide.hasOwnProperty(key)) {
                        column.field = key;
                        column.title = header[key];
                        column.visible = false;
                    } else {
                        if (params.formatters == null || params.formatters.length <= 0) {
                            column.field = key;
                            column.title = header[key];
                        } else {
                            if (((params.formatters.start != null && key.substr(key.indexOf("_") + 1) >= params.formatters.start)
                                && ((params.formatters.end != null && key.substr(key.indexOf("_") + 1) <= params.formatters.end)
                                || (params.formatters.end == null))) || (params.formatters.all != null)) {
                                column.field = key;
                                column.title = header[key];
                                column.formatter = params.formatters.name;
                            } else {
                                column.field = key;
                                column.title = header[key];
                            }
                        }
                    }
                }
                if (params.hasOwnProperty("class")) {
                    column.class = params.class;
                }
                columns.push(column);

            }

            if (params.lineEndTotal) {
                columns.push({
                    field: "TOTAL",
                    title: "合计",
                    formatter: function (value, row) {
                        var total = 0;
                        for (var key in row) {
                            if (key.indexOf("FIELD_") >= 0 && typeof row[key] == "number") {
                                total += row[key];
                            }
                        }

                        return total;
                    }
                });
            }


            //构建图表需要的数据结构，示例如下：
            //[
            // {来源, 路基, 路面},
            // {手机, 2, 3},
            // {合计, 2, 3}
            // ]

            var dataSource = [];
            var row = [];

            for (key in header) {
                if (header.hasOwnProperty(key) && (!(params.hide != null && params.hide.hasOwnProperty(key)))) {
                    row.push(header[key]);
                }
            }

            //添加表头行
            dataSource.push(row);

            //添加数据行
            for (var index = 0; index < dataRows.length; index ++) {
                var dataRow = dataRows[index];
                row = [];

                if (params.defalutColumns != null) {
                    for (key in dataRow) {
                        if (!(params.hide != null && params.hide.hasOwnProperty(key))) {
                            row.push(dataRow[key]);
                        }
                    }
                } else {
                    for (key in header) {
                        if (dataRow.hasOwnProperty(key) && (!(params.hide != null && params.hide.hasOwnProperty(key)))) {
                            row.push(dataRow[key]);
                        }
                    }
                }
                //添加数据行

                dataSource.push(row);
            }


            //初始化表格
            var id = that.get(0).id;
            $(id).bootstrapTable("destroy");

            if (params.defalutColumns != null) {
                params.defalutColumns.push(columns);
                columns = params.defalutColumns.slice(0);
            }

            var btTable = that.btTable = bt.init({
                id: id,
                // height: 0,
                pagination: false,
                columns: columns
            });

            btTable.bootstrapTable('append', dataRows);

            if (dataSource.length > 1) {
                if (params.total) {
                    var totalObject = _total(dataRows);
                    btTable.bootstrapTable('append', totalObject);

                    //添加总计行
                    row = [];
                    for (key in totalObject) {
                        if (totalObject.hasOwnProperty(key)) {
                            row.push(totalObject[key]);
                        }
                    }

                    dataSource.push(row);
                }
            }

            that.dataSource = dataSource;
            that.setting = params;
            that.lineEndTotal = params.lineEndTotal;
            that.total = params.total;

            function _total(data) {
                var result = {};

                var num = 0;
                for (var index = 0; index < data.length; index ++ ) {
                    var item = data[index];

                    for(var key in item) {
                        var numKey = item[key].toString();
                        if (!isNaN(item[key]) && numKey.indexOf(".") > 0) {
                            var length = numKey.substr(numKey.indexOf("."), numKey.length).length;
                            if (length > num) {
                                num = length;
                            }
                        }
                        var m = Math.pow(10, num);
                        if (!result[key]) {
                            result[key] = Number(item[key]);
                        } else {
                            result[key] = parseInt(result[key] * m + Number(item[key]) * m, 10) / m ;
                        }
                    }
                }

                for (key in header) {
                    if (header.hasOwnProperty(key)) {
                        result[key] = "合计";
                        break;
                    }
                }

                return result;
            }
        });

        deferred.fail(function (response) {
            alert(JSON.stringify(response));
        });

        return this;
    };

})(jQuery);

/**
 * 封装echart图表
 */
;(function ($) {

    $.fn.echart = function(options, myChart) {
        /**
         * echart图表缺省配置项
         * @type {{theme: string, total: boolean, data: Array, tooltip: {trigger: string}, legend: {data: Array}, xAxis: {data: Array}, yAxis: {type: string}, series: Array, seriesType: {type: string}}}
         */
        var defaultOptions = {
            theme: "macarons",        //图表主题
            total: true,            //包含统计行
            data: [],               //图表数据来源集合(包含表头数据和表内容数据)
            type: true,             //图例和x轴的值的来源（默认为true：数据的第一行为x轴的值，第一列为图例；false则相反）

            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            xAxis: {
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [],

            /*seriesType: {
             type: "bar",
             barWidth: 30,
             label: {
             normal: {
             show: true,
             position: 'top'
             }
             }
             }*/

            seriesType: {
                type: "line",
                // markPoint: {
                //     data : [
                //         {type : 'max', name: '最大值'},
                //         {type : 'min', name: '最小值'}
                //     ]
                // },
                // markLine:  {
                //     data : [
                //         {type : 'average', name: '平均值'}
                //     ]
                // }
            }

        };

        var option = $.extend({}, defaultOptions, options);

        //如果legend和xAxis都设置了值，直接显示图表
        if (option.legend.data && option.legend.data.length > 0  && option.xAxis.data && option.xAxis.data.length > 0) {
            // var myChart = echarts.init(this.get(0), option.theme);
            myChart.setOption(option);

            return this;
        }

        //未传递data属性值，直接结束
        if (!option.data || option.data.length == 0) {
            return;
        }

        //根据data属性动态计算图表需要的数据
        if (option.type) {
            //数据的第一行为x轴的值，第一列为图例
            computeRowEchartData(option);
        } else {
            //数据的第一行为图例，第一列为x轴的值
            computeColEchartData(option);
        }

        if (!option.legend.data || option.legend.data.length == 0) {
            return;
        }

        if (!option.xAxis.data || option.xAxis.data.length == 0) {
            return;
        }

        //显示图表
        // var myChart = echarts.init(this.get(0), option.theme);
        myChart.setOption(option);

        return this;
    };

    //数据的第一行为图例，第一列为x轴的值
    var computeColEchartData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legend;
        //图表的x轴数据
        var xAxisData = [];

        var data = option.data;


        //获得表头行
        var legendData = data[0];
        //去除第一个数据
        legend = legendData.slice(1, legendData.length);

        //如果存在统计行，去除统计行数据
        var rows = data.slice(1, data.length);
        if (option.total) {
            rows = rows.slice(0, rows.length - 1);
        }

        //创建二维数组
        var rowsData =  [legend.length];
        for (var i = 0; i < legend.length; i++) {
            rowsData[i] = [rows.length];
        }

        //转换数据格式，获得x轴的值
        $.each(rows, function (ind, val) {

            xAxisData.push(val[0]);

            val = val.slice(1, val.length);
            $.each(val, function (index, value) {
                rowsData[index][ind] = value;
            })
        })

        //生成series数据
        $.each(rowsData, function (index, value) {

            var serieData = value;

            var serie = $.extend({}, option.seriesType);

            serie.name = legend[index];
            serie.data = serieData;

            series.push(serie);

        });

        option.legend.data = legend;
        option.xAxis.data = xAxisData;
        option.series = series;
    };

    //数据的第一行为x轴的值，第一列为图例
    var computeRowEchartData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legendData = [];
        //图表的x轴数据
        var xAxis;

        var data = option.data;

        //获得表头行
        var xAxisData = data[0];
        //去除第一个数据
        xAxis = xAxisData.slice(1, xAxisData.length);

        //如果存在统计行，去除统计行数据
        var rows = data.slice(1, data.length);
        if (option.total) {
            rows = rows.slice(0, rows.length - 1);
        }

        $.each(rows, function (index, value) {
            var serieData = value;
            var serie = $.extend({}, option.seriesType);

            serie.name = serieData[0];
            serie.data = serieData.slice(1, serieData.length);

            legendData.push(serie.name);
            series.push(serie);

        });

        option.legend.data = legendData;
        option.xAxis.data = xAxis;
        option.series = series;
    };



    $.fn.echartPie = function(options, myChart) {
        /**
         * 饼图缺省选项
         * @type {{theme: string, data: Array, tooltip: {trigger: string}, tooltip: {trigger: string}, legend: {data: Array}, series: {type: string}}}
         */
        var defaultOptions = {
            theme: "macarons",
            total: true,            //包含统计行
            data: [],
            title: {
                text: '',
                x: 'center',
                padding: 40
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: 'right',
                data: []
            },
            series: [{
                name: '',
                type: 'pie',
                selectedMode: 'single',
                radius: '55%',
                center: ['50%', '60%'],
                data: [],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };

        var option = $.extend({}, defaultOptions, options);
        //如果legend和xAxis都设置了值，直接显示图表
        if (option.legend.data && option.legend.data.length > 0) {
            /*var myChart = echarts.init(this.get(0), option.theme);*/
            myChart.setOption(option);
        }

        //未传递data属性值，直接结束
        if (!option.data || option.data.length == 0) {
            return;
        }

        //根据data属性动态计算图表需要的数据
        computeEchartPieData(option);

        if (!option.legend.data || option.legend.data.length == 0) {
            return;
        }

        //显示图表
        /*var myChart = echarts.init(this.get(0), option.theme);*/
        myChart.setOption(option);

        return this;
    };

    var computeEchartPieData = function (option) {
        //图表的显示数据
        var series = [];
        //图表的图例数据
        var legendData = [];

        var data = option.data;

        //定义存放饼图图列数据
        legendData = data[0].slice(1, data[0].length);
        //定义存放饼图数据
        series = [];
        //饼图的数据
        //定义变量，存放饼图的数据
        var seriesData;
        if (option.total) {
            seriesData = data[1].slice(data[1].length - data[0].length + 1, data[1].length);
        } else {
            //表格体数据集
            var dataRows = data.slice(1);

            var result = [];

            for (var i = 0; i < dataRows.length; i ++ ) {
                var item = dataRows[i];

                for(var key in item) {
                    if (!result[key]) {
                        result[key] = item[key];
                    } else {
                        result[key] += item[key];
                    }
                }
            }
            seriesData = result.slice(1, result.length);

        }

        //定义存放饼图数据中的每一条数据
        var pieData;
        //循环数据，组成饼图数据
        $.each(seriesData, function (index, val) {
            pieData = {};
            pieData.name = legendData[index];
            pieData.value = val;
            series.push(pieData);
        });

        option.legend.data = legendData;
        option.series[0].data = series;
    };

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o){
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };
}) (jQuery);