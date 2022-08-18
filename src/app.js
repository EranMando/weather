const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000 // where heroku puts the port to run our program

// define paths for express coonfig
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') // default path for the hbs files are in root_dir/views
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
   res.render('index', { // render is used for hbs files ( hbs files are used if we want the page to be dynamic) , (we use html files for static pages)
      title: 'Weather App',
      name: 'Eran Mando'
   }) // provide a hbs file in views
})

app.get('/about',(req,res) => {
   res.render('about', {
      name: 'Eran Mando',
      title: 'About'
   }) // provide a hbs file in views
})

app.get('/help',(req,res) => {
   res.render('help', {
      name: 'Eran Mando',
      title: 'Help page'
   }) // provide a hbs file in views
})


// app.get('',(req, res) => { // req = info about the incoming request to the server // res = methods that allows to us to customize what we want to send as a response
//    res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res) => {
//    res.send({  
//       name: 'Eran',
//       age: 22
//    })
// })

// app.get('/about',(req,res) => {
//    res.send('<h1>About</h1>')
// })

app.get('/weather',(req,res) => {
   if(!req.query.address){
      res.send({ error: 'You must provide an address'})
      return
   }
   geocode(req.query.address,(error,{longitude,latitude} = {})=>{
      if(error){
         res.send({error})
         return 
      }
      forecast(longitude,latitude,(error,data)=>{
         if(error){
            res.send({error})
            return
         }
         res.send({
            address: req.query.address,
            forecast: data
         })
         return
      })
   })
})

// app.get('/products',(req,res) => {
//    if(!req.query.search){
//       res.send({
//          error: 'You must provide a search term'
//       })
//       return
//    }
//    console.log(req.query)
//    res.send({
//       products: []
//    })
// })

app.get('/help/*',(req,res) => {
   res.render('404page',{
      title: 'Help articel is not found',
      name: 'Eran Mando'
   })
})

app.get('*', (req,res)=>{
   res.render('404page',{
      title: 'Page not found',
      name: 'Eran Mando'
   })
})


app.listen(port, ()=> { // runs on the server when its up and running   
   console.log('Server is up on port: ' + port)
})



// heroku create ${name}
// add start key to package scripts in package.json to tell heroku which file to run