
import * as dotenv from 'dotenv' 
import validator from 'validator'
import DAO from './models/DAO.js'
import { nanoid } from 'nanoid';
import  UrlShortenRepository from './models/url_shorten_repository.js';
dotenv.config();
import express from 'express'
const app  = express()
const port = process.env.PORT
app.use(express.json())
//config db
const dao = new DAO('./db.sqlite3');
const urlShortRepo = new UrlShortenRepository(dao)
urlShortRepo.createTable()
//
app.get("/", (req, res)=>{
    return res.json({
        "create new url shorten, method post": "/api/",
        "go to new url shorten, method get":"/api/<shorten_url>"
    })
})
app.post("/api/", async (req, res)=>{
    const {url} = req.body
    const promss = await dao.get('select count(*) from URL_SHORTEN')
    
    if(validator.isURL(url)){
        const id = nanoid(10)
        const base = process.env.BASE
        try{
            
            const origin = await urlShortRepo.getDataByOriginUrl(url)
            if(origin){
                return res.json(origin)
            }else{
                const shortUrl = `${base}/api/${id}`;
            let date = new Date()
            const obj = {
                id : id,
                original_url : url,
                shorten_url : shortUrl,
                date_created: date.toISOString().slice(0, 10),
            }
            await urlShortRepo.insert(obj)
            }
            
            return res.json(await urlShortRepo.getById(id))
        }catch(err){
            console.log(err);
            res.status(500).json('Server Error');
        }
        
    }else{
        return res.json({"msg":"fail"})
    }
    
})
app.get("/api/:id", async (req, res)=>{
    const {id} = req.params

    const data = await urlShortRepo.getOriginalUrl(id)
    if(data){
        return res.redirect(data.ORIGINAL_URL)
    }
    
    return res.status(404).json({"msg":"Not found!!!"})
})

app.listen(port, ()=>{
    console.log("server is starting");
})