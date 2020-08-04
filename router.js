var express = require("express");
var router = express.Router();
var Per = require("./models/user");
var Menus = require('./models/menus')
var jwt = require("jsonwebtoken");
var Right = require('./models/right')
var RightTree = require('./models/rightTree')
var Role = require('./models/role')
var Commodity = require('./models/commodity') //商品列表
var Imcf = require('./models/imcf')      //商品分类
var Cfpara = require('./models/cfpara')  //分类参数
var Order = require('./models/order')    //订单

//登录界面
router.post("/login", function (req, res) {
  Per.findOne(
    { username: req.body.username, password: req.body.password },
    function (err, data) {
      if (err) return console.error(err);
      if (data == null) {
        var meta = {
          msg: '用户名不存在',
          status: 400,
        };
        return res.send(JSON.stringify({ data, meta }));
      }
      let payload = { name: data.username, admin: true };
      let secret = "yxx";
      let token = jwt.sign(payload, secret);
      var meta = {
        msg: "登录成功！",
        status: 200,
        token,
      };
      return res.send(JSON.stringify({ data, meta }));
    }
  );
});

//获取菜单数据
router.get('/menus', function (req, res) {
  Menus.find(function (err, data) {
    if (err) return console.error(err);
    var meta = {
      msg: "获取菜单列表成功",
      status: 200,
    };
    return res.send(JSON.stringify({ data, meta }));
  })
})

//获取用户数据
router.post('/users', function (req, res) {
  Per.find(function (err2, data2) {
    var total = data2.length
    Per.find().skip((req.body.pagenum - 1) * req.body.pagesize).limit(req.body.pagesize).then(result => {
      // console.log(result)
      var meta = {
        msg: "获取菜单列表成功",
        status: 200,
      };
      var data = {
        data: req.body.pagenum,
        total,
        users: result
      }
      return res.send(JSON.stringify({ data, meta }));
    })
  })
})
//改变用户状态
router.post('/changeStatus', function (req, res) {
  Per.findOneAndUpdate({ _id: req.body.im._id }, { status: req.body.im.status }, function (err, data) {
    if (err) {
      var meta = {
        msg: '更新用户状态失败',
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    var meta = {
      msg: "更新用户状态成功",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));
  })
})
//查询用户
router.post('/queryUsers', function (req, res) {
  Per.find({ username: eval("/" + req.body.query + "/") }).then((result) => {
    var total = result.length
    var data = {
      total,
      users: result
    }
    return res.send(JSON.stringify({ data }));
  })
})
//查询商品
router.post('/queryGoods', function (req, res) {
  Commodity.find({ goods_name: eval("/" + req.body.query + "/") }).then((result) => {
    var total = result.length
    var data = {
      total,
      Goods: result
    }
    return res.send({ data });
  })
})
//添加用户
router.post('/addUser', function (req, res) {
  Per.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }], }, function (err, data) {
    if (err) return console.error(err);
    if (data) {
      var meta = {
        msg: '用户名或邮箱已存在',
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    else {
      new Per(req.body).save(function (err, data) {
        if (err) return console.error(err);
        console.log(data)
        var meta = {
          msg: "添加成功",
          status: 200,
        };
        return res.send(JSON.stringify({ meta }));
      })
    }
  })
})
//修改用户
router.post('/modiftUser', function (req, res) {
  Per.findOne({ _id: req.body.id }, function (err, data) {
    res.send(data)
  })
})
//修改用户成功
router.post('/modifycc', function (req, res) {
  Per.findOneAndUpdate({ username: req.body.username }, { email: req.body.email, mobile: req.body.mobile }, function (err, data) {
    var meta = {
      msg: "修改用户信息成功！",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));
  })
})
//删除用户
router.post('/deluser', function (req, res) {
  Per.findByIdAndRemove(req.body.id, function (err, data) {
    var meta = {
      msg: "删除成功！",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));
  })
})
//获取权限列表
router.get('/rights', function (req, res) {
  var list = []
  RightTree.find(function (err, data) {
    data.forEach((item) => {
      list.push(item)
      item.children.forEach(item1 => {
        list.push(item1)
        item1.children.forEach(item2 => {
          list.push(item2)
        })
      })
    })
    var meta = {
      msg: "获取权限列表成功",
      status: 200,
    };
    res.send({ list, meta })
  })
})
router.get('/addq', function (req, res) {
  // var list = []
  // RightTree.find(function (err, data) {
  //   data.forEach((item) => {
  //     list.push(item)
  //     item.children.forEach(item1 => {
  //       list.push(item1)
  //       item1.children.forEach(item2 => {
  //         list.push(item2)
  //       })
  //     })
  //   })
  // })
  // new RightTree({
  //   authName: '用户管理',
  //   level: '0',
  //   path: 'rights',
  //   children: [
  //     {
  //       authName: '用户列表', level: '1', path: 'users', children: [
  //         { authName: '添加用户', level: '2', path: 'users', children: null },
  //         { authName: '删除用户', level: '2', path: 'users', children: null },
  //         { authName: '更新用户', level: '2', path: 'users', children: null },
  //       ]
  //     },
  //     // {
  //     //   authName: '权限列表', level: '1', path: 'rights', children: [
  //     //     { authName: '查看权限', level: '2', path: 'rights', children: null },
  //     //     // { authName: '创建商品参数', level: '2', path: 'params', children: null },
  //     //   ]
  //     // },
  //     // {
  //     //   authName: '商品分类', level: '1', path: 'categories', children: [
  //     //     { authName: '添加分类', level: '2', path: 'categories', children: null },
  //     //     { authName: '删除分类', level: '2', path: 'categories', children: null }
  //     //   ]
  //     // },
  //   ]
  // }).save(function (err, data) {
  //   console.log(data)
  // })
})
router.get('/getRoles', function (req, res) {
  Role.find(function (err, data) {
    res.send(data)
  })
})
router.post('/delRole', function (req, res) {
  // console.log(req.body)
  Role.findById(req.body.id, function (err, data) {
    var list = data
    list.children[req.body.i1].children[req.body.i2].children.splice(req.body.i3, 1)
    Role.findByIdAndUpdate(req.body.id, list, function (err, data) {
      res.send(list)
    })
  })
})
router.post('/delRole1', function (req, res) {
  // console.log(req.body)
  Role.findById(req.body.id, function (err, data) {
    var list = data
    list.children.splice(req.body.i1, 1)
    Role.findByIdAndUpdate(req.body.id, list, function (err, data) {
      res.send(list)
    })
  })
})
router.post('/delRole2', function (req, res) {
  // console.log(req.body)
  Role.findById(req.body.id, function (err, data) {
    var list = data
    list.children[req.body.i1].children.splice(req.body.i2)
    Role.findByIdAndUpdate(req.body.id, list, function (err, data) {
      res.send(list)
    })
  })
})
router.get('/getrightslist', function (req, res) {
  RightTree.find(function (err, data) {
    res.send(data)
  })
})
router.post('/assignPermissions', function (req, res) {
  Role.findByIdAndUpdate(req.body.id, { children: req.body.list2 }, function (err, data) {
    res.send('ok')
  })
  // // Role.findById(req.body.id, function (err, data) {
  // //   console.log(data)
  // // })
  // var list = []
  // var a = 0
  // var b = 0
  // // req.body.list.forEach((item, index) => {
  // //   if (item.level === '2')
  // //     l2.push(item)
  // // })
  // RightTree.find(function (err, data) {
  //   data.forEach((item, i1) => {
  //     item.children.forEach((item2, i2) => {
  //       item2.children.forEach((item3, i3) => {
  //         req.body.list.forEach((item4) => {
  //           if (item3.authName === item4.authName) {
  //             console.log(data[i1].children[i2].children[i3])
  //             // list[a] = item[]
  //             // list[a].children = []
  //             // list[a].children.push(item2)
  //             // list[a].children[b] = []
  //             // list[a].children[b].children.push(item3)
  //             // a++;
  //             // b++
  //           }
  //         })
  //       })
  //     })
  //   })
  // })
})
//添加角色
router.post('/addRole', function (req, res) {
  Role.findOne({ $or: [{ rolename: req.body.rolename }, { roleDesc: req.body.roleDesc }], }, function (err, data) {
    if (data) {
      var meta = {
        msg: "角色名称或角色描述已存在！",
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    new Role({
      rolename: req.body.rolename,
      roleDesc: req.body.roleDesc
    }).save(function (err1, data1) {
      var meta = {
        msg: "添加角色成功！",
        status: 200,
      };
      return res.send(JSON.stringify({ meta }));
    })
  })
})
//编辑角色
router.post('/editRole', function (req, res) {
  Role.findByIdAndUpdate(req.body.id, { rolename: req.body.role.rolename, roleDesc: req.body.role.roleDesc }, function (err, data) {
    if (err) {
      var meta = {
        msg: "编辑角色失败！",
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    var meta = {
      msg: "编辑成功！",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));

  })
})
//删除角色
router.post('/delRole3', function (req, res) {
  Role.findByIdAndRemove(req.body.id, function (err, data) {
    if (err) {
      var meta = {
        msg: "删除失败！",
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    var meta = {
      msg: "删除成功！",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));
  })
})
//获取角色列表
router.get('/getRoleNameList', function (req, res) {
  Role.find(function (err, data) {
    return res.send(data)
  })
})
//分配角色
router.post('/modifyRole', function (req, res) {
  Per.findByIdAndUpdate(req.body.id, { role_name: req.body.role_name }, function (err, data) {
    if (err) {
      var meta = {
        msg: "分配权限失败！",
        status: 400,
      };
      return res.send(JSON.stringify({ meta }));
    }
    var meta = {
      msg: "分配权限成功！",
      status: 200,
    };
    return res.send(JSON.stringify({ meta }));
  })
})
router.post('/getCatelist', function (req, res) {
  var list = []
  var i = 0
  var length = 0
  Imcf.find({ level: '0' }, function (err, data) {
    var total = data.length
    Imcf.find({ level: '0' }).skip((req.body.pagenum - 1) * req.body.pagesize).limit(req.body.pagesize).then(result => {
      list = result
      result.forEach((item, i1) => {
        Imcf.find({ path: item.path, level: '1' }, function (err1, data1) {
          list[i1].children = data1
          length += data1.length
          data1.forEach((item2, i2) => {
            Imcf.find({ path: item2.path2, level: '2' }, function (err2, data2) {
              list[i1].children[i2].children = data2
              i++
              if (i == length) {
                var data = {
                  total,
                  catelist: list
                }
                return res.send(data);
              }
            })
          })
        })
      })
    })
  })
})
router.get('/getdjList', function (req, res) {
  var list = []
  var length = 0
  Imcf.find({ level: '1' }, function (err, data) {
    Imcf.find({ level: '0' }, function (err, result) {
      list = result
      result.forEach((item, i1) => {
        Imcf.find({ path: item.path, level: '1' }, function (err1, data1) {
          data1.forEach((item3, i3) => {
            data1[i3].children = null
          })
          list[i1].children = data1
          length += data1.length
          if (length == data.length) {
            return res.send(list);
          }
        })
      })
    })
  })
})
//添加分类
router.post('/addCfDialog', function (req, res) {
  if (req.body.id.length == 0) {
    new Imcf({
      name: req.body.name,
      level: '0',
      path: req.body.name
    }).save(function (err, data) {
      Imcf.findByIdAndUpdate(data._id, { path: data._id }, function (err, data1) {
        var meta = {
          msg: "添加分类成功！",
          status: 200,
        };
        return res.send(meta);
      })
    })
  }
  else if (req.body.id.length == 1) {
    Imcf.findById(req.body.id[0], function (err, data) {
      new Imcf({
        name: req.body.name,
        level: '1',
        path: data.path,
      }).save(function (err, data2) {
        Imcf.findByIdAndUpdate(data2._id, { path2: data2._id }, function (err, data3) {
          var meta = {
            msg: "添加分类成功！",
            status: 200,
          };
          return res.send(meta);
        })
      })
    })
  }
  else if (req.body.id.length == 2) {
    Imcf.findById(req.body.id[1], function (err, data) {
      new Imcf({
        name: req.body.name,
        level: '2',
        path: data._id,
      }).save(function (err, data1) {
        new Cfpara({ pathid: data1._id }).save(function (err, data) {
          var meta = {
            msg: "添加分类成功！",
            status: 200,
          };
          return res.send(meta);
        })
      })
    })
  }
})
//编辑分类
router.post('/editDialog', function (req, res) {
  Imcf.findByIdAndUpdate(req.body.id, { name: req.body.name }, function (err, data) {
    var meta = {
      msg: "编辑分类成功！",
      status: 200,
    };
    return res.send(meta);
  })
})
//删除分类
router.post('/delImcf', function (req, res) {
  var i = 0
  if (req.body.level == '0') {

    var list = []
    list.push(req.body._id)
    req.body.children.forEach(item => {
      list.push(item._id)
      item.children.forEach(item2 => {
        list.push(item2._id)
      })
    })
    Imcf.remove({ _id: { $in: list } }).then(data => {
      var meta = {
        msg: "删除分类成功！",
        status: 200,
      };
      return res.send(meta);
    })
  }
  else if (req.body.level == '1') {
    var list = []
    list.push(req.body._id)
    req.body.children.forEach(item => {
      list.push(item._id)
    })
    Imcf.remove({ _id: { $in: list } }).then(data => {
      var meta = {
        msg: "删除分类成功！",
        status: 200,
      };
      return res.send(meta);
    })
  }
  else if (req.body.level == '2') {
    Imcf.findByIdAndRemove(req.body._id, function (err, data) {
      Cfpara.findOneAndRemove({ pathid: req.body._id }, function (err, data1) {
        var meta = {
          msg: "删除分类成功！",
          status: 200,
        };
        return res.send(meta);
      })
    })
  }
})
//获取分类等级
router.get('/getFllist', function (req, res) {
  var list = []
  var i = 0
  var length = 0
  Imcf.find({ level: '0' }, function (err, data) {
    list = data
    data.forEach((item, i1) => {
      Imcf.find({ path: item.path, level: '1' }, function (err1, data1) {
        list[i1].children = data1
        length += data1.length
        data1.forEach((item2, i2) => {
          Imcf.find({ path: item2.path2, level: '2' }, function (err2, data2) {
            data2.forEach(item3 => {
              item3.children = null
              list[i1].children[i2].children.push(item3)
            })
            i++
            if (i == length) {
              return res.send({ list });
            }
          })
        })
      })
    })
  })
})
//获取参数值
router.post('/getPara', function (req, res) {
  Cfpara.findOne({ pathid: req.body.id }, function (err, data) {
    return res.send(data)
  })
})
//删除标签
router.post('/delLabel', function (req, res) {
  Cfpara.findByIdAndUpdate(req.body._id, { dypara: req.body.dypara, staticpro: req.body.staticpro }, function (err, data) {
    res.send('ok')
  })
})
router.post('/getGoods_list', function (req, res) {
  Commodity.find(function (err2, data2) {
    var total = data2.length
    Commodity.find().skip((req.body.pagenum - 1) * req.body.pagesize).limit(req.body.pagesize).then(result => {
      var meta = {
        msg: "获取菜单列表成功",
        status: 200,
      };
      var data = {
        total,
        goods_list: result
      }
      return res.send(JSON.stringify({ data, meta }));
    })
  })
})
router.post('/modifyGoods', function (req, res) {
  Commodity.findByIdAndUpdate(req.body._id, { goods_name: req.body.goods_name, goods_price: req.body.goods_price, goods_weight: req.body.goods_weight }, function (err, data) {
    var meta = {
      msg: "获取菜单列表成功",
      status: 200,
    }
    return res.send({ meta })
  })
})
router.post('/delgoods', function (req, res) {
  Commodity.findByIdAndRemove(req.body.id, function (err, data) {
    var meta = {
      msg: "删除成功！",
      status: 200,
    }
    return res.send({ meta })
  })
})
router.post('/addGoods', function (req, res) {
  new Commodity(req.body).save(function (err, data) {
    var meta = {
      msg: "添加商品成功！",
      status: 200,
    };
    return res.send(meta);
  })
})
router.post('/getOrders', function (req, res) {
  Order.find(function (err2, data2) {
    var total = data2.length
    Order.find().skip((req.body.pagenum - 1) * req.body.pagesize).limit(req.body.pagesize).then(result => {
      var meta = {
        msg: "获取菜单列表成功",
        status: 200,
      };
      var data = {
        total,
        orderList: result
      }
      return res.send({ data, meta });
    })
  })
})
router.post('/queryOrders', function (req, res) {
  Order.find({ orderno: eval("/" + req.body.query + "/") }).then((result) => {
    var total = result.length
    var data = {
      total,
      orderList: result
    }
    return res.send({ data });
  })
})
router.post('/deliverChange', function (req, res) {
  Order.findByIdAndUpdate(req.body.id, { deliver: req.body.deliver }, function (err, data) {
    if (req.body.deliver) {
      var meta = {
        msg: "已发货",
        status: 200,
      };
      return res.send({ meta });
    } else {
      var meta = {
        msg: "取消发货",
        status: 200,
      };
      return res.send({ meta });
    }

  })
})
module.exports = router;
