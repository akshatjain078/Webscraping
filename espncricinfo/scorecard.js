//let url='https://www.espncricinfo.com//series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard';

const request=require('request')
const cheerio=require('cheerio')
const path=require('path');
const fs=require('fs');
const xlsx = require('xlsx')
function processscorecard(url){
    request(url,cb);
}


function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        extractMatchDetails(html);
    }
}
 function extractMatchDetails(html){
    let seltool=cheerio.load(html);
    let descele=seltool('[class="ds-text-tight-m ds-font-regular ds-text-ui-typo-mid"]')
    let result=seltool('[class="ds-text-tight-m ds-font-regular ds-truncate ds-text-typo-title"]')
    let resultstring=result.text();
    let dedcarr=descele.text().split(',');
    let venue=dedcarr[1].trim();
    let date=dedcarr[2].trim();
    let year=dedcarr[3].trim();
    // console.log(venue)
    // console.log(date);
    // console.log(year);
    // console.log(resultstring);

    let innings=seltool('[class="ds-bg-fill-content-prime ds-rounded-lg"]')
   let htmlstring='';
   for(let i=0;i<innings.length;i++){
    htmlstring=htmlstring+seltool(innings[i]).html();

    let teamname=seltool(innings[i]).find('[class="ds-text-tight-s ds-font-bold ds-uppercase"]').text();
    teamname=teamname.split('INNINGS')[0].trim();
    let opponentindex=i==0?1:0;
    let opponentname=seltool(innings[opponentindex]).find('[class="ds-text-tight-s ds-font-bold ds-uppercase"]').text();
    opponentname=opponentname.split('INNINGS')[0].trim();
    let ciniing=seltool(innings[i]);
    let allrows=ciniing.find('[class="ds-w-full ds-table ds-table-xs ds-table-fixed ci-scorecard-table"] tbody tr');

    for(let j=0;j<allrows.length-4;j++){
        if(seltool(allrows[j]).hasClass('ds-text-tight-s')){
            let allcols=seltool(allrows[j]).find('td');
            let playerName=seltool(allcols[0]).text().trim();
            let runs=seltool(allcols[2]).text().trim();
            let balls=seltool(allcols[3]).text().trim();
            let fours=seltool(allcols[5]).text().trim();
            let sixes=seltool(allcols[6]).text().trim();
            let str=seltool(allcols[7]).text().trim();

            console.log(`${playerName}|${runs}|${balls}|${fours}|${sixes}|${str}`);

            processplayer(teamname,opponentname,playerName,runs,balls,fours,sixes,str,venue,date,year,resultstring);
        }
    }

    console.log("''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''")
   }

 }

 function processplayer(teamname,opponentname,playerName,runs,balls,fours,sixes,str,venue,date,year,resultstring){
   let teampath=path.join(__dirname,'IPL',teamname);
    dicreator(teampath)
    let filePath = path.join(teampath, playerName + ".xlsx");
    let content=sheetreader(filePath,playerName)

    let playerobj={
    playerName,
      teamname,
      opponentname,
      runs,
      balls,
      fours,
      sixes,
      str,
      venue,
      date,
      year,
      resultstring
    }
content.push(playerobj);
sheetwriter(filePath,playerName,content)
 }

 function dicreator(filepath){
    if(fs.existsSync(filepath)==false){
        fs.mkdirSync(filepath);
    }
}

function sheetwriter(filename,sheetName,jsondata){
    let newWB = xlsx.utils.book_new(); 
    let newWS = xlsx.utils.json_to_sheet(jsondata); 
    xlsx.utils.book_append_sheet(newWB, newWS,sheetName); 
    xlsx.writeFile(newWB, filename);
    
}

function sheetreader(filename,sheetName){
    if(fs.existsSync(filename)==false){
      return [];
  }
  let wb = xlsx.readFile(filename);
  let excelData = wb.Sheets[sheetName];
  let ans = xlsx.utils.sheet_to_json(excelData);
  return ans;
}

module.exports={
    ps:processscorecard
}