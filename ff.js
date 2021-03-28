let url = "https://www.espncricinfo.com/ci/content/squad/index.html?object=1210595";
let request = require("request");
let cheerio = require("cheerio");
let fs= require("fs");
 let path= require("path");
console.log("Before");
request(url, cb);
function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractHtml(html);
    }
}
function extractHtml(html) {
    let selTool = cheerio.load(html);
    let te = selTool(".squads_list li span")
    let se= selTool(".squads_list li span a")
    for(let i=0;i<te.length;i++)
    {

        if(i==0)
        {
             let m =selTool(te[i]).text().trim();
               let s= m.split("(2020/21)")

                 let r= s[0];
                 console.log(r);
             let a= selTool(se[i]).attr("href");
             let z="https://www.espncricinfo.com/"+a;
              //let q= s.split("Squad");
              Teem1(z,r)

        }
        else{
       let s= selTool(te[i]).text().trim();
       let t= selTool(se[i]).attr("href");
         let c="https://www.espncricinfo.com/"+t;
          let n = s.split("Squad");
          let x= n[0];
          Teem1(c,x)

        }
         // console.log( "team name" +">>"+n[0]);
         // Teem1(c);
    //console.log( "team name" +">>"+n[0]);
    //console.log("url"+">>"+c);
    }
}

    function Teem1(c,x)
    {
       
       // console.log("Before");
        request(c, cb);
        function cb(error, response, html) {
            if (error) {
                console.log(error)
            } else {
                // console.log(html);
                extractHtml1(html,x);
            }
        }
    }
             function extractHtml1(html,x) {
                 let selTool = cheerio.load(html);

                 let te = selTool(".large-13.medium-13.small-13.columns a");
                 makefolder1(x);
                // console.log("team name"+">>"+x);
                 for(let i=0;i<te.length;i++)
                 {
                  let n= selTool(te[i]).text().trim();
                    filemaker1(x,n);
                          // console.log(n);
             }
            }
            function  makefolder1(topicname)
            {
               let folderpath= path.join(__dirname,topicname)
               if(fs.existsSync(folderpath) ==false )
               { 
                    // console.log(folderpath);
                   fs.mkdirSync(folderpath);
               }
            }

          function   filemaker1(topicname,filename)
            {
                let filepath= path.join(__dirname,topicname,filename+".json");
                if(fs.existsSync(filepath) == false)
                {
                    fs.openSync(filepath,"w");
                }
            }

            




