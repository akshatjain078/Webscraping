const request = require('request');
request('https://www.worldometers.info/coronavirus/',cb)
const cheerio=require('cheerio')
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        handleHTML(html);
    }
}
function handleHTML(html){
    let seltool=cheerio.load(html);
    let contentArr=seltool('.maincounter-number span')
    // for(let i=0;i<contentArr.length;i++){
    //     let data=seltool(contentArr[i]).text();
    //     console.log(data)
    // }
    let data=seltool(contentArr[0]).text();
    console.log(data);
    
}