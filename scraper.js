const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

const fetching=async ()=>{
    const start=new Date()
    const regex=new RegExp('[0-9]')
    console.log(regex)
    const http=await fetch('https://ingatlan.com/lista/kiado+v-ker+lakas?fbclid=IwAR0itofsHolv370TKF1--pWP6DUkRkCfrsS1_1lltHizDx4xiaCeFdYR0js')
    const text=await http.text()
    const dom=new JSDOM(text)     
    const addresses=dom.window.document.querySelectorAll('.listing__address')
    
   
    
     for(let address of addresses){
        const toCheck=address.textContent.split(',')[0]
        regex.test(toCheck)? console.log(toCheck): console.log('not contains number')
    } 
    console.log((new Date().getTime()-start.getTime())/1000,'s runtime')      

}


fetching()

