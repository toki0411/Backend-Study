const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) //bodyparser 라이브러리 추가 

app.listen(52273, () => {
    console.log('listening on 52273');
});

app.get('/write', function(request,response){
    response.sendFile(__dirname + '/write.html')
});

app.post('/add',function(req,res){
    res.send('전송완료');
    console.log(req.body.title);
    console.log(req.body.date);

});