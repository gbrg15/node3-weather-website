const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Giobanno'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About me',
        name: 'Giobanno'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        helpText: 'No help for the wicked',
        name: 'Giobanno'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
        if(error) {
            return res.send({
                error:'No value retrieved geocode'
            })
        } 
        forecast(latitude, longitude, (error,forecastData) =>{
            if(error){
                return res.send({
                    error:'No value retrieved forecast'
                })
            }
            res.send(
                {forecast:forecastData,
                  location:location,
                  address: req.query.address  
                })
        })
    })


})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: 'Help 404',
        Message404: 'Help page not found',
        name: 'Giobanno'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: 'General 404',
        Message404: 'Apologies page not found',
        name: 'Giobanno'
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})