const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) //bodyparser 라이브러리 추가 
const MongoClient = require('mongodb').MongoClient;
var db;
app.set('view engine','ejs');

MongoClient.connect('db주소',{ useUnifiedTopology: true },function(에러,client){
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
    db.collection('counter').findOne({name : '게시물 갯수'},function(에러, 결과){
        var 총게시물갯수 = 결과.totalPost;
        console.log(결과.totalPost);
        console.log(req.body.date);
        console.log(req.body.title);
        db.collection('post').insertOne( {_id : (총게시물갯수 +1), date : req.body.date, 할일 : req.body.title } , function(에러, 결과){
	        console.log('저장완료'); 
            //counter 라는 콜렉션에 있는 totalPost 라는 항목도 1 증가시켜야함(수정) $set 은 변경이라는 뜻의 오퍼레이터 {$set: {totalPost : 바꿀 값 } } ,$inc :기존값에 더해줄 값
            db.collection('counter').updateOne({name : '게시물 갯수'},{ $inc : {totalPost:1}},function(에러, 결과){
                if(에러) return console.log(에러);
            });
    });    
});

app.get('/list',function(req,res){
    //디비에 저장된 post라는 collection안의 모든 데이터를 꺼내주세요!(외워서 가져다 쓰세요)
    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과);
        res.render('list.ejs',{posts : 결과 });   //ejs파일 보내는 법(ejs파일은 views 폴더 안에 있어야 함!) 앞에서 찾은걸 ejs파일에 post라는 이름으로 집어넣어주세요
    });
})
})