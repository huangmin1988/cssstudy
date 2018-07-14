
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

const HTMLTEMPLATE = `
<html>
    <head>
        <style>
            [stylehtml]
        </style>
    </head>
    <body>
        [srchtml]
    </body>
</html>
`;


var http = require('http');
var querystring = require('querystring');

const modelmg = require('./service/manage');
app.use(express.static('static'));
app.get('/preview', function (req, res) {
    let lasthtml = HTMLTEMPLATE.replace('[stylehtml]', TEMPSTYLE).replace('[srchtml]', TEMPHTML);
    res.send(lasthtml);
});

app.get('/service/*', function (req, res) {
    var fs = req.path.split("/");
    var fname = fs[fs.length - 1];
    modelmg[fname](res, req.query);
});
app.post('/service/*', function (req, res) {
    var fs = req.path.split("/");
    var fname = fs[fs.length - 1];
    modelmg[fname](res, req.body);
});

app.post('/savehtml',function(req,res){
    req.setEncoding('utf-8');
    res.set( {
        'Content-Type': 'application/force-download',
        'Content-disposition':'attachment; filename=test.html'});
    // 注册监听, 接收数据块
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    let postData = '';
    // 数据接收完毕, 执行回调函数
    req.addListener("end", function () {
        var params = querystring.parse(postData);  //解析 HEADER 中的数据
        // 
        let lasthtml = HTMLTEMPLATE.replace('[stylehtml]', params.css).replace('[srchtml]', params.html);
        res.send(lasthtml);
    });
})
app.get('/', function (req,res) {
    res.redirect('/views/index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});