// return weather report coming in from weatherstack api

const request = require('postman-request')

const forecast = (long, lat, callback) => {

    request({
        url:'http://api.weatherstack.com/current?access_key=08998da89f14c385d48c5aa180c86edf&query=' + long + ',' + lat,
        json:true
    },
    (err, data) => {
        if(err){
            callback('Something Went Wrong! Please Check your connection', undefined)
        }
        else if(data.body.success===false){
           callback(data.body.error.info, undefined) 
        }
        else{
            callback(
                undefined,
                // console.log(data.body)
                { 'place' : data.body.location.name + ', ' + data.body.location.country + ', ' + data.body.location.region,
                'temp': data.body.current.temperature, 
                'feelslike': data.body.current.feelslike,
                } 
                 
            )
        }
    }
    
    )
}

module.exports = forecast