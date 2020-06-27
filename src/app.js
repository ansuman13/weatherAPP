const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Views is 
// Template Model View Template(django) 
// MVC Model View Controller(nodejs) 

const publicDirectoryPath = path.join(__dirname, '../public')

const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsDirectoryPath)
const app = express()

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
app.set('views', viewsDirectoryPath)

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'Must provide Address as query paramas '
        })
    }

    geocode(place=req.query.address, (err, {place, longitude, latitude}={})=> {
        if(err){
            return res.send({error:err})
        }
        forecast(latitude, longitude, (err, {place, temp, feelslike})=>{
            if(err){
                return res.send({err})
            }
            res.send({
                address:req.query.address,
                temp:temp,
                place,
                feelslike,
                title:'Weather App'
            })
        })

    })
})

app.get('', (req, res)=>{
    res.render('weather',{
        title:'Weather App'
    })
})

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        title:'About Me',
        name:'Ansuman',
        age:24,
        job:'Software Engineer'
    })
})


app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'Ansuman'
    })
})


app.get('*', (req,res) =>{
    res.send('<h2> ("_") Lost!! ("..") me too, this is 404 page</h2><h3>No Page Found</h3>')
})


app.listen(process.env.PORT || 3000);