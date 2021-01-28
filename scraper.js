const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');

const getPages=async (url)=>{
    const http=await fetch(url)
    const text=await http.text()
    const dom=new JSDOM(text)     
    const pageNumber=dom.window.document.querySelector('.pagination__page-number').textContent
    return (parseInt(pageNumber.split(' ')[3]))
}

const fetching=async (url)=>{
    const start=new Date()
    const addressArray=[]
    const regex=new RegExp('[0-9]')
    //console.log(regex)
    const pages=await getPages(url)
    //console.log(pages)
    for(let i=1;i<=pages;i++){
        const http=await fetch(`${url}&page=${i}`)
        const text=await http.text()
        const dom=new JSDOM(text)     
        const addresses=dom.window.document.querySelectorAll('.listing__address')
        //console.log(addresses)
        for(let address of addresses){
            const toCheck=address.textContent
            if(regex.test(toCheck)){
                addressArray.push(toCheck)
                }
   
            } 
            console.log(i)
        }
    
    console.log(addressArray)
    console.log((new Date().getTime()-start.getTime())/1000,'s runtime')      

}

//&page=2

//fetching()
fetching('https://ingatlan.com/lista/elado+budapest+lakas')

//811 pages-692.431 sec
//2166 pages-1860.018
