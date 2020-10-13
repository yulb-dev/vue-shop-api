var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var Commoditychema = new Schema({
    //商品名称
    goods_name: {
        type: String,
        required: true,
    },
    //分类
    pathId: {
        type: String,
        required: true
    },
    //商品价格
    goods_price: {
        type: Number,
        default: 199
    },
    //商品重量
    goods_weight: {
        type: Number,
        default: 56
    },
    //商品动态参数
    goods_para: {
        type: Array,
        default: []
    },
    //商品静态属性
    goods_attr: {
        type: Array,
        default: []
    },
    //商品内容
    content: {
        type: String,
        default: ''
    },
    //商品分类名
    goods_class: {
        type: String,
        default: ''
    },
    //创建时间
    create_time: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Commodity", Commoditychema);
