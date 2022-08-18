const request = require('request')

const forecast = (longitude , latitude , callback) => {
   const url = `http://api.weatherstack.com/current?access_key=96c0777d79a1b50502c60df15b2e6e7d&query=${latitude},${longitude}&units=f`
   request({url, json:true },(error,{body})=>{
      if(error){
         callback('Unable to connect to weather service!', undefined)
         return
      }
      if(body.success === false){
         callback('Unable to find location', undefined)
         return
      }
      callback(undefined,`${body.current.weather_descriptions[0]}. The temperature currently in ${body.location.region} is ${body.current.temperature} and feels like ${body.current.feelslike}`)
   })
}

module.exports = forecast