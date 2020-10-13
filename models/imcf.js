var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var Imcfchema = new Schema({
    //级别名称
    name: {
        type: String,
        required: true,
    },
    //级别
    level: {
        type: String,
        required: true,
    },
    //路径
    path: {
        type: String,
        required: true,
    },
    //二级菜单路径对应三级菜单
    path2: {
        type: String,
        default: ''
    },
    children: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Imcfchema", Imcfchema);
