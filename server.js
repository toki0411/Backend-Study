const express = require('express');
const app = express();

app.use((request, response)=>{
    response.send('<h1>Hello express</h1>');
});
app.listen(52273, () => {
    console.log('listening on 52273');
});