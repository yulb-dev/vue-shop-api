var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//连接数据库
mongoose.connect("mongodb://localhost/Userin", { useNewUrlParser: true });
//设计集合结构
var RightTreeschema = new Schema({
    authName: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    children: {
        type: Array
    }
});

module.exports = mongoose.model("RightTree", RightTreeschema);
