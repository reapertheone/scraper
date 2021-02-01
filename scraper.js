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
    const pages=await getPages(url)
    //if you want to check it with partial data change pages to a number<=10 to make sure it wont cause error
    for(let i=1;i<=pages;i++){
        const http=await fetch(`${url}?page=${i}`)
        const text=await http.text()
        const dom=new JSDOM(text)     
        const addresses=dom.window.document.querySelectorAll('.listing__address')
        for(let address of addresses){
            const toCheck=address.textContent
            if(regex.test(toCheck)&&!addressArray.includes(`Budapest,${toCheck}`)){
               
                addressArray.push(`Budapest,${toCheck}`)
                }
   
            } 
            console.log(i)
        }
        console.log((new Date().getTime()-start.getTime())/1000,'s runtime')  
    return addressArray
        

}

//save addresses to json
const fetchAndSave = async (url,filename)=>{
    let res=await fetching(url)
    let data=JSON.stringify(res)
    
    fs.writeFile(`./${filename}.json`,data.split('\",').join('\",\n'),(err)=>{
        if(err) throw err;
        console.log(`root/${filename}.json is ready`)
    })
    

}


//first param is ingatlan.com url to scrape and second arg is the filename
fetchAndSave('https://ingatlan.com/lista/kiado+v-ker+lakas','sample') 

//811 pages-692.431 sec=13 min
//2166 pages-1860.018=31 min
