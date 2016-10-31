var path = require('path');
var fs = require('fs');
var koa = require('koa');
var router = require('koa-router')();
var serve = require('koa-static'); // 用于配置静态文件目录
var mount = require('koa-mount');  // 用于匹配具体路径
var logger = require('koa-logger'); // 打印请求等信息
var koaBody = require('koa-body')(
    {
        multipart:  true,
        patchNode:  true,
        patchKoa:  true,
        formLimit:  '20mb'
    }
);

var app = koa();
app.use(logger());

router
    .post('/upload', koaBody, function * (next){
        var file = this.request.body.file, type = this.request.body.type;
        

    })

app.use(router.routes())
app.use(router.allowedMethods());
app.use(mount('/', serve('./')))
app.listen(5000);
console.log('listening on port 5000');
