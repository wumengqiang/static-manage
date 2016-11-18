const coFs = require('co-fs');
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const mv = require('mv');

const conf = JSON.parse(fs.readFileSync(path.join(__dirname, '../local.conf'), 'utf8'));
const types = ['img', 'doc'];
function * upload(next){
    var that = this;
    console.log(Object.keys(this));
    console.log(this.request.body.fields);
    console.log(this.request.body.files);
    var file = this.request.body.files.file, type = this.request.body.fields.type;
    if(this.request.body.fields.phone !== conf.phone){
        that.response.status = 200; 
        that.response.body = { url: 'http://api.github.com' + '/seeyou/' + path.basename(file.path)};
        return;
    }
    if(types.indexOf(type) !== -1){
        var dir = path.join(__dirname,'../', type);
            try{
                coFs.mkdir(dir);
            } catch(e){

            }
        yield coFs.rename(file.path, path.join(dir, path.basename(file.path)));
        if(type === 'img'){
            var pathname = path.join(dir, path.basename(file.path));
            console.log(pathname);
            imagemin([pathname], 'build/images', {
                plugins: [
                    imageminMozjpeg({quality:  '70'}),
                    imageminPngquant({quality: '70'})
                ]
            }).then(files => {
                console.log('files');
                console.log('files', files);
                console.log(path.join(__dirname, '../', files[0].path), pathname)
                fs.rename(path.join(__dirname,'../', files[0].path), pathname);
                // var writeStream = fs.createWriteStream(pathname);
                // writeStream.write(files[0].data);
            }, data => {
                console.log(data)
            });         
        }

        that.response.status = 200;
        // res.type = "application/json";
        that.response.body = { url: conf.resourceHost + '/' + type + '/' + path.basename(file.path)};
    }
}

module.exports = upload;
