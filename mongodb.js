const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) //bodyparser 라이브러리 추가 
const MongoClient = require('mongodb').MongoClient;
var db;
app.set('view engine','ejs');

MongoClient.connect('mongodb+srv://admin:a123456789@cluster0.hi5o8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useUnifiedTopology: true },function(에러,client){
    if(에러) return console.log(에러)
    
    db = client.db('todoapp');

    

    app.listen(52273, () => {
        console.log('listening on 52273');
    });
});

app.get('/write', function(request,response){
    response.sendFile(__dirname + '/write.html')
});

app.post('/add',function(req,res){
    res.send('전송완료');
    console.log(req.body.date);
    console.log(req.body.title);
    db.collection('post').insertOne( {date : req.body.date, 할일 : req.body.title } , function(에러, 결과){
	    console.log('저장완료'); 
	});
});

app.get('/list',function(req,res){
    //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요!(외워서 가져다 쓰세요)
    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과);
        res.render('list.ejs',{posts : 결과 });   //ejs파일 보내는 법(ejs파일은 views 폴더 안에 있어야 함!) 앞에서 찾은걸 ejs파일에 post라는 이름으로 집어넣어주세요
    });
});