var exports1 = module.exports = {};

exports1.pcgetGenreAssets = function (album, genreinput, artist) {
    try {
        var temp = genreinput.toLowerCase();
        var iualbumdata = require('./datas/iualbums.json')
        if (artist.includes('IU')) {
            if (!album || !iualbumdata[album]) {
                return 'iudefault'
            }
            console.log(iualbumdata[album])
            return iualbumdata[album]
        }
        else { return switchGenre(temp) }
    }
    catch(Exception) {console.log(Exception)}
};

exports1.mobilegetGenreAssets = function (album, artist) {
    var iualbumdata = require('./datas/iualbums.json')
    if (artist.includes('IU')) {
        if (!album || !iualbumdata[album]) {
            return 'iudefault'
        }
        console.log(iualbumdata[album])
        return iualbumdata[album]
    }
    else { return switchGenre('') }
};

function switchGenre(genrelower) {
    var albumdata = require('./datas/genre.json')
    if (!genrelower || !albumdata[genrelower]) {
        return 'defaultgenre'
    }
    else {
        console.log(albumdata[genrelower])
        return albumdata[genrelower]
    }
};