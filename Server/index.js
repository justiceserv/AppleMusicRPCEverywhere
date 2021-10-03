const http = require('http')
const url = require('url')
const findprocess = require('find-process')
const configuration = require('./datas/server.json')
const discordrpc = require('discord-rpc')
const rpcchange = require('./rpcchange')
let client = new discordrpc.Client({transport : 'ipc'})

const server = http.createServer((request, response) => {
    var path = url.parse(request.url).pathname
    console.log(path)
    if(path === '/validate') {
        var params = url.parse(request.url, true).query; 
        if(configuration.secretpassphrase === params.secret) {
            response.writeHead(200, {'Content-Type' : 'text/html'})
            response.end('Valid')
        }
        else {
            response.writeHead(418, {'Content-Type' : 'text/html'}) //I'm a teapot!
            response.end('Invalid')
        }
    }
    else if(path === 'newrpc') {
        var data = ""
        request.on('data', function (chunk) {
            data += chunk; 
        })
        request.on('end', function(){
            try{
                var reqJson = JSON.parase(data); 
                if(!reqJson.name || !reqJson.album) { console.log("Client sent wrong information.") }
                else if(!reqJson.elapsedTime) { rpcchange.mobilerpcchange(reqJson.name, reqJson.album, client) }
                else { rpcchange.pcrpcchange(reqJson.name, reqJson.artist, reqJson.album, reqJson.genre, reqJson.remainingTime, client)}
            }catch(Exception) { console.log("Client sent wrong information.") }
        })
    }
    else {
        response.writeHead(404, {'Content-Type' : 'text/html'})
        response.end('404')
    }
})
server.listen(configuration.OpenPort, function() {
    findprocess('name', 'Discord', 'true').then(function(list) {
        if(list.length == 0) {console.log("Discord is not running! Open discord first."); process.exit(0)}
        else {console.log(list); console.log("I guess its running.")}
    });
    client.login({ clientId: '891586647790075964' }).catch(console.error);
    client.on('ready', () => { })
})