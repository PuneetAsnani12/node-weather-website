const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//Define paths for Express config
const publicPath =path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicPath))


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Puneet Asnani'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Us',
        api:'Darksky',
        name:'Puneet Asnani'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'We are here to help !!',
        contact:'Developer Puneet Asnani',
        name:'Puneet Asnani'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
             error:'You must provide an address to see the forecast.'
         })
     }
  
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{ 
        if (error){
           return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            } 

            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })          
          })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term.'
        })
    }
 
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404-page',{
        title:'404-page',
        error:'Help article not found.',
        name:'Puneet Asnani'
    })
})

app.get('*',(req,res)=>{
    res.render('404-page',{
        title:'404-Page',   
        error:'Page not found.',
        name:'Puneet Asnani'
    })
})
 

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

