const {JSDOM} = require('jsdom');
const fetch = require('node-fetch');
const fs =require('fs')

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
        const http=await fetch(`${url}?page=${i}`)
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
    
    return addressArray
    console.log((new Date().getTime()-start.getTime())/1000,'s runtime')      

}

//&page=2

//fetching()
const fetchAndSave = async ()=>{
    let res=await fetching('https://ingatlan.com/szukites/kiado+lakas+vi-ker')
    let file=fs.createWriteStream('./asdhatodik.txt')
    res.forEach((address)=>{
        file.write(`${address},\n`)
    })

}

fetchAndSave()

//811 pages-692.431 sec=13 min
//2166 pages-1860.018=31 min
