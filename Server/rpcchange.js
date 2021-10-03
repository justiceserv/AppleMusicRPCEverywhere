const searchItunes = require('@tbogard/itunes-search')
const genre = require('./getGenreAssets')
const exported = module.exports = [];

exported.mobilerpcchange = function (title, album, client) {
    var artist = album.substring(album.indexOf('-') - 1)
    var album1 = album.substring(album.indexOf('-') + 2, album.length)
    searchItunes(`${artist} - ${title}`).then((result) => {
        if (!result.results[0].trackViewUrl) {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity:
                {
                    details: `Playing ${title}`,
                    state: `Album ${album1}`,
                    timestamps:
                    {
                        start: Date.now(),
                    },
                    assets:
                    {
                        large_image: genre.mobilegetGenreAssets(album1, artist),
                        large_text: `Made by Justiceserv's AppleMusicRPCEverywhere`,
                        small_image: `applemusic`,
                        small_text: 'https://jserv.xyz/',
                    },
                    buttons: [
                        {
                            label: 'Unable on Apple Music', url: `http://localhost`
                        }
                    ]
                }
            })
        }
        else {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity:
                {
                    details: `Playing ${title}`,
                    state: `Album ${album1}`,
                    timestamps:
                    {
                        start: Date.now(),
                    },
                    assets:
                    {
                        large_image: genre.mobilegetGenreAssets(album1, artist),
                        large_text: `Made by Justiceserv's AppleMusicRPCEverywhere`,
                        small_image: `applemusic`,
                        small_text: 'https://jserv.xyz/',
                    },
                    buttons: [
                        {
                            label: 'Listen On Apple Music', url: `${result.results[0].trackViewUrl}`
                        }
                    ]
                }
            })
        }
    })

}

exported.pcrpcchange = function (title, artist, album, genre, remainingTime, client) {
    searchItunes(`${artist} - ${title}`).then((result) => {
        if(!result.results[0].trackViewUrl) {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity:
                {
                    details: `Playing ${title}`,
                    state: `Album ${album}`,
                    timestamps:
                    {
                        end: Date.now() + remainingTime * 1000,
                    },
                    assets:
                    {
                        large_image: genre.pcgetGenreAssets(album, genre, artist),
                        large_text: `Made by Justiceserv's AppleMusicRPCEverywhere`,
                        small_image: `applemusic`,
                        small_text: 'https://jserv.xyz/',
                    },
                    buttons: [
                        {
                            label: 'Unable on Apple Music', url: `http://localhost`
                        }
                    ]
                }
            })
        }
        else {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity:
                {
                    details: `Playing ${title}`,
                    state: `Album ${album}`,
                    timestamps:
                    {
                        end: Date.now() + remainingTime * 1000,
                    },
                    assets:
                    {
                        large_image: genre.pcgetGenreAssets(album, genre, artist),
                        large_text: `Made by Justiceserv's AppleMusicRPCEverywhere`,
                        small_image: `applemusic`,
                        small_text: 'https://jserv.xyz/',
                    },
                    buttons: [
                        {
                            label: 'Listen On Apple Music', url: `${result.results[0].trackViewUrl}`
                        }
                    ]
                }
            })
        }
    })
}