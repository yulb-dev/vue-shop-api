var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var Rightschema = new Schema({
    authName: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    //角色id
    pid: {
        type: Number,
        default: 0,
    },
    path: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Right", Rightschema);
