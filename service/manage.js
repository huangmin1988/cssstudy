const fs = require('fs');
const fname = __dirname + '/data.json';

let TEMPDATA = {};

function addCssModel(res,bodyparams){
    const key = bodyparams.key;
    const cdata = bodyparams.data;
    TEMPDATA[key] = cdata;
    savedata();
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify({ success: true }));
}
function deleteModel(res,params){
    const key = params['key'];
    if (TEMPDATA[key]){
        delete TEMPDATA[key];
    }
    savedata();
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify({ success: true }));
}

function savedata(){
    fs.writeFile(fname, JSON.stringify(TEMPDATA), function (err) {
        if (err) console.log('写文件操作失败');
        else console.log('写文件操作成功');
    });
}
function updateCssModel(res, bodyparams){
    const key = bodyparams.key;
    const data = bodyparams.data;
    TEMPDATA[key] = data;
    savedata();
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.send(JSON.stringify({success:true}));
}
function queryData(res, params){
    const key = params['key'];
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    let responsedata = {};
    if (TEMPDATA[key]){
        responsedata = TEMPDATA[key];
    }
    res.send(JSON.stringify(responsedata));
}
function queryAllList(res) {
    fs.readFile(fname, 'utf8', function (err, data) {
        if (err) console.log(err);
        const test1 = JSON.parse(data);
        TEMPDATA = {...test1};
        res.setHeader('Content-Type', 'application/json;charset=utf-8');
        res.send(JSON.stringify(Object.keys(test1)));
    });
}
module.exports = {
    add: function (res, data) {
        addCssModel(res, data);
    },
    del: function (res,key) {
        deleteModel(res,key);
    },
    update: function (res,data) {
        updateCssModel(res,data);
    },
    getAllList: function (res){
        queryAllList(res);
    },
    query: function (res, params) {
        queryData(res, params);
    }
};