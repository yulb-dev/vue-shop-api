var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//连接数据库
mongoose.connect("mongodb://localhost/Userin", { useNewUrlParser: true });
//设计集合结构
var Orderchema = new Schema({
    //订单编号
    orderno: {
        type: String,
        required: true,
    },
    //订单价格
    orderprice: {
        type: Number,
        required: true,
    },
    //是否付款
    payment: {
        type: Boolean,
        default: false
    },
    //是否发货
    deliver: {
        type: Boolean,
        default: false
    },
    //下单时间
    placetime: {
        type: Date,
        default: Date.now()
    },
    //物流信息
    logim: {
        type: Array,
        default: [{
            content: '您的订单开始处理',
            timestamp: '2020-04-22 8:02'
        }, {
            content: '已发货',
            timestamp: '2020-04-22 8:44'
        }, {
            content: '【潍坊市】已离开 山东潍坊市分拨中心；发往河南郑州分拨中心',
            timestamp: '2020-04-22 22:09'
        }, {
            content: '【郑州市】已到达 河南郑州分拨中心',
            timestamp: '2020-04-23 13:23'
        }, {
            content: '【郑州市】已离开 河南郑州分拨中心；发往 河南博爱县公司',
            timestamp: '2020-04-22 13:23'
        }, {
            content: '【焦作市】已到达 河南博爱县公司',
            timestamp: '2020-04-24 7:56'
        }, {
            content: '【焦作市】河南博爱县公司金城分部派件员：*** 电话：***********',
            timestamp: '2020-04-24 8:10'
        }]
    }
});

module.exports = mongoose.model("Order", Orderchema);
