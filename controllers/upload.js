const fs = require('co-fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const mv = require('mv');

const types = ['image', 'doc'];
function * upload(next){
    var that = this;
    console.log(Object.keys(this));
    console.log(this.request.body.fields);
    console.log(this.request.body.files);
    var file = this.request.body.files.file, type = this.request.body.fields.type;
    if(types.indexOf(type) !== -1){
        var dir = path.join(__dirname,'../', type);
            console.log('ok1');
            try{
                fs.mkdir(dir);
            } catch(e){

            }
        console.log('ok2', file.path,  path.join(dir, path.basename(file.path)));
        yield fs.rename(file.path, path.join(dir, path.basename(file.path)));
        if(type === 'image'){
            var pathname = dir + path.basename(file.path);
            imagemin([pathname], dir, {
                plugins: [
                    imageminMozjpeg(),
                    imageminPngquant({quality: '65-80'})
                ]
            }).then(files => {
                console.log("files");
            });         
        }

        that.response.status = 200;
        // res.type = "application/json";
        that.response.body = { url: "http://localhost:5000/" + type + '/' + path.basename(file.path)};
    }
}

module.exports = upload;
