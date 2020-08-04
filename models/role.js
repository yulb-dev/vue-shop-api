var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//连接数据库
mongoose.connect("mongodb://localhost/Userin", { useNewUrlParser: true });
//设计集合结构
var Roleschema = new Schema({
    //角色名称
    rolename: {
        type: String,
        required: true,
    },
    //角色描述
    roleDesc: {
        type: String,
        required: true,
    },
    children: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("Role", Roleschema);
