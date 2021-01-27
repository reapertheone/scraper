const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

const fetching=async ()=>{
    const start=new Date()
    const http=await fetch('https://weight-tracker2.herokuapp.com/login')
    const text=await http.text()
    const dom=new JSDOM(text)     
    console.log(dom.window.document.querySelector('h1').textContent)
    console.log((new Date().getTime()-start.getTime())/1000,'s runtime')      

}


fetching()

