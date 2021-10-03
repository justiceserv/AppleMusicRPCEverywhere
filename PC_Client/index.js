const iTunes = require('itunes-bridge');
const request = require('request')
const configuration = require('./datas/config.json')
const iTunesEmitter = iTunes.emitter; 

iTunesEmitter.on('playing', function (type, CurrentTrack) {
    var options = {
        uri: `http://${configuration.serverip}:${configuration.serverport}/newrpc`, 
        method: 'POST', 
        json: {
            "name" : CurrentTrack.name,
            "album" : CurrentTrack.album,
            "artist" : CurrentTrack.artist,
            "genre" : CurrentTrack.genre, 
            "remainingTime" : CurrentTrack.remainingTime, 
            "secretKey" : configuration.secretpass
        }
    };
    request(options, function (error, response, body) {
        if(!(!error) || response.statusCode != 200) {
            console.log(body)
            console.log(error)
        }
    });
})

iTunesEmitter.on('paused', function () { 
    var options = {
        uri: `http://${configuration.serverip}:${configuration.serverport}/pauserpc`, 
        method: 'POST', 
        json: {
            "secretKey" : configuration.secretpass
        }
    };
    request(options, function (error, response, body) {
        if(!(!error) || response.statusCode != 200) {
            console.log(body)
            console.log(error)
        }
    });
})

iTunesEmitter.on('stopped', function () { 
    var options = {
        uri: `http://${configuration.serverip}:${configuration.serverport}/pauserpc`, 
        method: 'POST', 
        json: {
            "secretKey" : configuration.secretpass
        }
    };
    request(options, function (error, response, body) {
        if(!(!error) || response.statusCode != 200) {
            console.log(body)
            console.log(error)
        }
    });
})