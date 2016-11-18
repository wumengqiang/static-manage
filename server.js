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
        formLimit:  '3mb',
        formidable: {
            uploadDir: __dirname,
            keepExtensions: true,
            maxFieldsSize: '3mb'
        //     // onFileBegin: function(name, file){
        //     //     console.log("haga");
        //     //     fs.readFile(name, function(data){
        //     //         if(data.err){
        //     //             var stream = fs.createWriteStream(name);
        //     //             stream.end(file, 'utf-8');
        //     //         }
        //     //     })
            // }
        }
    }
);

process.env.NODE_DEBUG = 'fs';



var upload = require('./controllers/upload');

var app = koa();
app.use(logger());

router
    .post('/upload', koaBody, upload); 

app.use(router.routes())
app.use(router.allowedMethods());
app.use(mount('/', serve('./')))
app.listen(5000);
console.log('listening on port 5000');
