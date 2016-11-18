$(function(){
    document.querySelector('#button-submit').addEventListener('click', function(){
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
            $.ajax({
                url:  '/upload',
                type:  'POST',
                contentType: false,
                data:  data,
                processData:  false,
                success:  function(){
                    console.log('success');
                },
                error:  function(){
                    console.log('error');
                }
            })
    })
})
