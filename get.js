const express = require('express');
const app = express();

app.listen(52273, () => {
    console.log('listening on 52273');
});

app.get('/pet', function(request,response){
    response.send('펫용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(request,response){
    response.send('뷰티용품 사세요.');
});