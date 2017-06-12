/**
 * Created by Administrator on 2017/5/24 0024.
 */
var obj;
var initObj = {
    init: function () {
        this.visitorsSummary();
        this.trendMapFun(obj);
        this.sourceInterviewFun(obj);
        this.accessProportionFun(obj);
        $(".moreMsg").click(function () {
            $(".brow-statis-main").hide();
            $(".interview_record").show();
        });
        this.visit();
        this.clickPage();
    },
    visitorsSummary: function () {
        $.ajax({
            type: "get",
            async: false,
            url: "/api/sealnet/visitorsSummary",
            cache: false,
            success: function (data) {
                data = JSON.parse(data);
                if (data.code == 0) {
                    var str = '';
                    obj = data.data;
                    var data = obj.dataTotal;
                    $(".visit").html(data.sevenDayTotal);
                    $(".visitTotal").html(data.total);
                    $(".realVisit").html(data.sevenDayAuthenticateTotal)
                    $(".realVisitTotal").html(data.authenticatorTotal)
                    $(".regVisit").html(data.sevenDayRegisterTotal)
                    $(".regVisitTotal").html(data.registerTotal)
                    $(".report").html(data.sevenDayReportTotal)
                    $(".reportTotal").html(data.reportTotal)
                    var visitorCompany = obj.visitorCompany;
                    console.log(visitorCompany);
                    if (isEmptyObject(visitorCompany)) {
                        str += '<li>' +
                            '<span> &nbsp;&nbsp;无</span>' +
                            '</li>'
                    }
                    function isEmptyObject(e) {
                        var t;
                        for (t in e)
                            return !1;
                        return !0
                    }
                    for (var i = 1; i < visitorCompany.length + 1; i++) {
                        str += '<li>' +
                            '<span class="num">' + i + '.</span>' +
                            '<span>' + visitorCompany[i - 1] + '</span>' +
                            '</li>'
                    }
                    $(".visitorCompany").append(str);
                } else {
                    $("#alertText").text(data.msg || "网络异常，请稍后再试");
                    $("#customAlert").modal("show");
                }
            },
            error: function (data) {
                $("#alertText").text(data.msg || "网络异常，请稍后再试");
                $("#customAlert").modal("show");
            }
        })
    },
    trendMapFun: function (obj) {
        var option = this.getTrendMapData(obj);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('dataTrendMap'));
        // 绘制图表
        myChart.setOption(option);
    },
    getTrendMapData: function (obj) {
        console.log(obj)
        var item = obj.dataTrend.totalTrend;
        var keys = [], values = [], months = [], days = [];
        for (var key in item) {
            keys.push(key);
            values.push(item[key]);
        }
        for (var i = 0; i < keys.length; i++) {
            keys[i] = keys[i].substr(4, 4)
        }
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].substr(0, 2) < 10) {
                months[i] = keys[i].substr(1, 1)
            } else {
                months[i] = keys[i].substr(0, 2)
            }
            if (keys[i].substr(0, 2) < 10) {
                days[i] = keys[i].substr(3, 1)
            } else {
                days[i] = keys[i].substr(2, 2)
            }
            keys[i] = months[i] + '月' + days[i] + '日'
        }
        var option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'

            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },

            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    splitNumber: 1,
                    data: keys
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '用户访问',
                    type: 'line',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#0664d0',
                            lineStyle: {
                                color: '#0D7EFF'
                            }
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#5FA7F9'
                        }
                    },
                    data: values
                }
            ]
        };
        return option;
    },
    sourceInterviewFun: function (obj) {
        var option = this.getSourceInterviewData(obj);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('dataSourceInterview'));
        // 绘制图表
        myChart.setOption(option);
    },
    getSourceInterviewData: function (obj) {
        var item = obj.visitorSource;
        var province = [];
        var total = [];
        var data = [];
        for (var key in item) {
            province.push(key);
            total.push(item[key]);
        }
        for (var i = 0; i < province.length; i++) {
            data[i] = { name: '广东', value: total[i] }
        }
        var option = {
            title: {
                // text: 'iphone销量',
                // subtext: '纯属虚构',
                // left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                // orient: 'vertical',
                // left: 'left',
                // data:['iphone3','iphone4','iphone5']
            },
            visualMap: {
                min: 0,
                max: 500,
                left: 'left',
                top: 'bottom',
                text: ['High', 'Low'],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable: true
            },
            series: [
                {
                    name: '印章',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {//显示省份
                        // normal: {
                        //     show: true
                        // },
                        // emphasis: {
                        //     show: true
                        // }
                    },
                    data: data

                }
            ]
        };
        return option;
    },
    accessProportionFun: function (obj) {
        var option = this.getAccessProportionData(obj);
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('dataAccessProportion'));
        // 绘制图表
        myChart.setOption(option);
    },
    getAccessProportionData: function (obj) {
        var item = obj.visitorRatio;
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            color: ['#358DF3', '#35F388', '#F37035'],
            // label: {
            //     normal: {
            //         textStyle: {
            //             color: '#000000'
            //         }
            //     }
            // },
            // labelLine: {
            //     normal: {
            //         lineStyle: {
            //             color: '#000000'
            //         },
            //         smooth: 0.2,
            //         length: 10,
            //         length2: 20
            //     }
            // },
            legend: {
                orient: 'vertical',
                x: 'left',
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['40%', '55%'],
                    data: [
                        { value: item.registerTotal, name: '注册用户' },
                        { value: item.authenticatorTotal, name: '企业认证用户' },
                        { value: item.guestTotal, name: '游客' }
                    ]
                }
            ]
        };
        return option;
    },
    visit: function (pageNumber, pageSize) {
        var _this = this;
        $.ajax({
            type: "get",
            async: true,
            datatype: "json",
            url: "/api/sealnet/visitorsList",
            data: {
                "pageNumber": pageNumber || 1,
                "pageSize": pageSize || 5,
                "order":"asc"
            },
            success: function (data) {
                var data=JSON.parse(data);
                if (data.code == 0) {
                    _this.totalPage = Math.ceil(data.data.totalNumber / data.data.pageSize);
                    if(_this.totalPage<1){
                        $("nav").hide()
                    }
                    _this.pagination(data.data.pageNumber);
                    //_this.totalPage=(data.data.pageNumber-1)*5+1
                    $(".interview_record .module").remove();
                    $.each(data.data.list, function (ind, val) {
                        $(".interview_record tbody").append(_this.list).children(".module").eq(ind).
                            find(".index").html(parseInt(ind + 1)).
                            siblings(".company").html(val.name).
                            siblings(".time").html(val.time)
                    })
                }
            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })
    },
    pagination: function (pageNumber) {
        $("#pageLimit li.index").remove();
        var firstShowPage, maxShowPage = 5
        if (pageNumber <= 3) {
            firstShowPage = 1
        } else {
            firstShowPage = pageNumber - 2;
        }
        var lastShowPage = maxShowPage + firstShowPage - 1;
        if (lastShowPage > this.totalPage) {
            lastShowPage = this.totalPage;
        }
        for (var i = firstShowPage; i <= lastShowPage; i++) {
            pageIndex = '<li class="index"><a>' + i + '</a></li>';
            $(".appendPage").before(pageIndex)
        };

        if (!this.active) { this.active = $("#pageLimit .index").eq(0) } else {
            this.active = $("#pageLimit a:contains(" + this.active.find('a').text() + ")").parents("li");
        };

        this.active.addClass("active").siblings().removeClass("active")
    },
    pageData: function () {
        this.active = '';
        this.totalPage = '';
        this.list=$(".interview_record .module")[0].outerHTML;
    },
    clickPage: function () {
        var _this = this;
        this.pageData();
        $(".all-user-main").on("click", "li.index", function () {
            _this.active = $(this);
            _this.visit($(this).text());
        })
        $(".all-user-main").on("click", "li.PreviousPage", function () {
            if (parseInt($("#pageLimit li.active").text()) != 1) { _this.active = _this.active.prev(); }
            var currentPage = Math.min(parseInt($("li.active").text()) - 1, _this.totalPage)
            _this.visit(currentPage);
        })
        $(".all-user-main").on("click", "li.NextPage", function () {
            if (parseInt($("#pageLimit li.active").text()) != _this.totalPage) { _this.active = _this.active.next(); }
            var currentPage = Math.min(parseInt($("li.active").text()) + 1, _this.totalPage)
            _this.visit(currentPage);
        })
    }
}
initObj.init();
