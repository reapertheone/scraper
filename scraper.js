const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

const fetching=async ()=>{
    const http=await fetch('https://weight-tracker2.herokuapp.com/login')
    const text=await http.text()
    const dom=new JSDOM(text)     
    console.log(dom.window.document.querySelector('h1').textContent)      

}

fetching()