const request = require("request")
const cheerio=require('cheerio')
let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary"
request(url,cb);
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        handlehtml(html);
    }
}
function handlehtml(html){
    let seltool=cheerio.load(html);
    let eleArr=seltool('.ds-ml-4 .ci-html-content')
    let content=seltool(eleArr[0]).text();
    console.log(content)

}