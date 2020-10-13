var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var menusSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    authName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    },
    //子菜单
    children: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model("Menus", menusSchema);
