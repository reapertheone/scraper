const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

const fetching=async ()=>{
    const start=new Date()
    const http=await fetch('https://www.google.com/search?q=gumikacsa')
    const text=await http.text()
    const dom=new JSDOM(text)     
    const hrefs=dom.window.document.querySelectorAll('a')
    for(let a of hrefs){
        console.log(a.href)
    }
    console.log((new Date().getTime()-start.getTime())/1000,'s runtime')      

}


fetching()

