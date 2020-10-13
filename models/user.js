var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//设计集合结构
var perSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //角色id
  rid: {
    type: Number,
    default: 0,
  },
  //手机号
  mobile: {
    type: String,
    default: "123",
  },
  //第几页
  pagenum: {
    type: Number,
  },
  //创建日期
  create_time: {
    type: Date,
    default: Date.now()
  },
  role_name: {
    type: String,
    default: ''
  },
  // //介绍
  // bio: {
  //   type: String,
  //   default: "",
  // },
  // gender: {
  //   type: Number,
  //   enum: [-1, 0, 1],
  //   default: -1,
  // },
  // barthday: {
  //   type: Date,
  // },
  // //账号状态
  status: {
    // 0 没有权限限制
    // 1 不可以评论
    // 2 不可以登录
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Per", perSchema);
