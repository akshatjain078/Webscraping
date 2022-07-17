const url='https://www.espncricinfo.com/series/ipl-2020-21-1210595'
const request=require('request')
const cheerio=require('cheerio');
const allmatchObj = require('./allmatch');
const fs=require('fs');
const path=require('path');
let iplpath=path.join(__dirname,"IPL");
dicreator(iplpath);
request(url,cb);
function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else{
        extractlink(html)
    }
}

function extractlink(html){
    // [class="ds-block ds-text-center ds-uppercase ds-text-ui-typo-primary ds-underline-offset-4 hover:ds-underline hover:ds-decoration-ui-stroke-primary ds-block"]
    // .ds-py-3.ds-px-4>span>a
    let seltool=cheerio.load(html);
    let classele=seltool('.ds-py-3.ds-px-4>span>a');
    let link=classele.attr('href');
    let fulllink='https://www.espncricinfo.com/'+link;
  allmatchObj.getAllmatch(fulllink);
}

function dicreator(filepath){
    if(fs.existsSync(filepath)==false){
        fs.mkdirSync(filepath);
    }
}


    