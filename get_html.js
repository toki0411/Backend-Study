const express = require('express');
const app = express();

app.listen(52273, () => {
    console.log('listening on 52273');
});

app.get('/', function(request,response){
    response.sendFile(__dirname + '/index.html')
});
