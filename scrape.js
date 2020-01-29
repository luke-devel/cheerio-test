const request = require('request');
const cheerio = require('cheerio');


const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
// writeStream.write(`Title,Link,Date \n`);


// gb 4gHs8pWsgZpndQZKs6QVRH
// dd 5Z3IWpvwOvoaWodujHw7xh
var arstistId = '5Z3IWpvwOvoaWodujHw7xh'
request('https://open.spotify.com/artist/' + arstistId + '/about', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        eval($('script')[7].children[0].data)

        // 5kyTqxwLNQk50dJZIzFQuq
        // Retrieve
        console.log('\nArtist Genres:')
        console.log(Spotify.Entity.genres);

        console.log('\nArtist Cities With Listener Data:')
        console.log(Spotify.Entity.insights.cities);

        // Creates list of related artists
        const relatedArtists = $('.cover.artist');
        var relatedArtistIds = [];
        $('.cover.artist').each(function () {
            var link = $(this).attr('href');
            relatedArtistIds.push({ "link": link });
        });

        // logs related artist ids to console.
        console.log('\nRelated artist Ids:');
        console.log(relatedArtistIds);

        console.log('\nScraping Done...');
    }
});