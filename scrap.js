const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const writeStream = fs.createWriteStream('apps.csv');
const express = require('express');
const app = express();
const http = require('http').Server(app);
// Headers
writeStream.write(`App Name,Page URL,Download links\n`);

// Scraping Function
function scrapeme(html){
    const $ = cheerio.load(html);
    $('#pagedata li ').each((i,el) => {
        const name = $(el).find('.category-template-title').children('a').text();
        const applink =  $(el).find('.category-template-title').children('a').attr('href');
        const app_link = 'https://apkpure.com' + applink;
        const downlink =  $(el).find('.category-template-down ').children('a').attr('href');
        const down_link = 'https://apkpure.com' + downlink;
        // Write to CSV
        writeStream.write(`${name},${app_link},${down_link}\n`);
        
    });
}

request('https://apkpure.com/app',(error,response,html) => {
    if(!error && response.statusCode==200){
        scrapeme(html);
    }
});
request('https://apkpure.com/app?page=2',(error,response,html) => {
    if(!error && response.statusCode==200){
        scrapeme(html);
    }
});
request('https://apkpure.com/app?page=3',(error,response,html) => {
    if(!error && response.statusCode==200){
        scrapeme(html);
    }
});
request('https://apkpure.com/app?page=4',(error,response,html) => {
    if(!error && response.statusCode==200){
        scrapeme(html);
    }
});
request('https://apkpure.com/app?page=5',(error,response,html) => {
    if(!error && response.statusCode==200){
        scrapeme(html);
    }
});

app.get('/',(req,res) =>{
    res.sendFile(__dirname +'/index.html');
});

app.get('/download',(req,res) =>{
    res.download(__dirname + '/apps.csv','app.csv',() => console.log("File Downloaded"));
});

app.listen(3000,() => console.log("Listening on port 3000"));
