$(function(){

    new Clipboard('.copy-url');
    document.querySelector('.upload-wrapper').addEventListener('click', function(event){
        $("#file").click();
    })

    document.querySelector('#file').addEventListener('change', function(event){
        if(event.target.files.length === 0){
            return;
        }
        var file = $('#file')[0].files[0], type =  $('#type').val();
        if(! file || ! type){
            alert('表单内容不能为空');
            return;
        }
        var phone = localStorage.getItem('phone');
        if(! phone){
            location.href = 'http://tympanus.net/codrops/'
            return;
        }
            var data = new FormData();
            data.append('file', file);
            data.append('type', type);
            data.append('phone', phone);
            $('.upload-wrapper').text('上传中...');
            $.ajax({
                url:  '/upload',
                type:  'POST',
                contentType: false,
                data:  data,
                processData:  false,
                success:  function(data){
                    $('.upload-wrapper').text('文件上传');
                    var url = data.url;
                    $('.copy-url').attr('data-clipboard-text', url).removeClass('hidden');
                    console.log('success');
                },
                error:  function(data){
                    console.log('error');
                    $('.copy-url').addClass('hidden');
                    $('.upload-wrapper').text('文件上传');                    
                }
            })
    })
})
