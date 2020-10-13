var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var Cfpara = new Schema({
    //三级菜单的 ID
    pathid: {
        type: String,
        required: true,
    },
    //动态参数
    dypara: {
        type: Array,
        default: []
    },
    //静态属性
    staticpro: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("Cfpara", Cfpara);
