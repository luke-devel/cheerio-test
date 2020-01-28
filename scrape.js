const request = require('request');
const cheerio = require('cheerio');


const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');

// Write Headers
// writeStream.write(`Title,Link,Date \n`);

var arstistId = '5Z3IWpvwOvoaWodujHw7xh'
request('https://open.spotify.com/artist/' + arstistId + '/about', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        fs.writeFile('Output.html', html, (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })
        const listItem = $('.horizontal-list__item');

        var listenerOutput = listItem.text();
        console.log(listenerOutput);

        fs.writeFile('listenerData.txt', listenerOutput, (err) => {

            // In case of a error throw err. 
            if (err) throw err;
        })

        const relatedArtists = $('.cover.artist');
        var relatedArtistIds = [];
        $('.cover.artist').each(function () {
            var link = $(this).attr('href');
            relatedArtistIds.push({ "link": link });
        });

        // logs related artist ids to console.
        console.log(relatedArtistIds);

        console.log('Scraping Done...');
    }
});