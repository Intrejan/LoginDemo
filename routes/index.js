let mongoose = require('mongoose');
let User = require('../public/javascripts/model');

mongoose.Promise = global.Promise;
module.exports = function (app) {
  app.get('/register', function(req, res) {
    res.render('register', { title: '用户注册' });
  });

  app.get('/login', function(req, res) {
    res.render('login', { title: '用户登录' });
  });

  /**
   * 处理注册提交的表单
   */
  app.post('/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let postData = {
      username:username,
      password:password
    };
    User.findOne({username:postData.username},function (err,data) {
      if (data) {
        console.log('用户名已被注册');
        res.sendStatus(500);
      } else {
        // 保存到数据库
        User.create(postData, function (err, data) {
          if (err) throw err;
          console.log('注册成功');
          res.sendStatus(200);
          //res.redirect('/login');
        })
      }
    })
  });

  /**
   * 处理登录
   */
  app.post('/login',function (req,res) {
    let postData = {
      username:req.body.username,
      password:req.body.password,
    };
    User.findOne({
      username: postData.username,
      password: postData.password
    }, function (err, data) {
      if(err) throw err;
      if(data){
        console.log('登录成功');
        res.sendStatus(200)
        //res.redirect('/home');
      }else{
        console.log('登录失败');
        res.sendStatus(404)
      }
    } )
  });

  app.get('/home', function(req, res) {
    res.render('homepage', { title: '主页' });
  });
};
