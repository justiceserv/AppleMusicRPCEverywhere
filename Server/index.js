const http = require('http')
const url = require('url')
const configuration = require('./datas/server.json')

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
})
server.listen(3333, function() {
    console.log("I guess its running...");
})