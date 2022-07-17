const request=require('request');
const cheerio=require('cheerio');
const scorecardobj=require('./scorecard')
function getallmatchlink(uri){
    request(uri,function(error,response,html){
        if(error){
            console.log(error);
        }
        else{
           let seltool=cheerio.load(html);
           let scorecardarr=seltool('[class="ds-flex ds-mx-4 ds-pt-2 ds-pb-3 ds-space-x-4 ds-border-t ds-border-line-default-translucent"] span:nth-child(3)>a');
            for(let i=0;i<scorecardarr.length;i++){
                let link=seltool(scorecardarr[i]).attr('href');
                let fulllink='https://www.espncricinfo.com/'+link;
                //console.log(fulllink);
                scorecardobj.ps(fulllink);
            }

        }
    })
}

module.exports={
  getAllmatch:getallmatchlink
}