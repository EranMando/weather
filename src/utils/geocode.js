const request = require('request')
const geocode = (address,callback) => {
   const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZXJhbm14eCIsImEiOiJjbDZ5YWpvZDUwOG9nM2ttcDE5amlnODBkIn0.dGfRByEkJk68pjrEYxw-3w&limit=1`
   request({url, json:true },(error,{body})=>{
      if(error){
         callback('Unable to connect to the location', undefined)
         return
      }
      if(body.features.length === 0){
         callback('Unable to find location. Try another search', undefined)
         return
      }
      const latitude = body.features[0].center[1]
      const longitude = body.features[0].center[0]
      // console.log(`${address} = ${longitude},${latitude}`)
      callback(undefined,{latitude: latitude, longitude: longitude, placename: body.features[0].place_name})
})
}




module.exports = geocode