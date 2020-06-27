const request = require('postman-request')

const geocode = (place, callback) => {
    request({
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1IjoiYW5zdW1hbjEzIiwiYSI6ImNrYnQ4dGNrZjA3ZWEycm42d3I0bzY0MDcifQ.wA6n3DMRLlHFl4sgHmS5-w',
            json: true
        },
        (err, data) => {
            if(err){
                callback('Something Went Wrong, Please check your connection!', undefined)
            }
            else if(data.body.features.length===0){
                callback('Place doesnt exist, please enter correct place name', undefined)
            }
            else{
                callback(undefined, 
                    {   place_name:data.body.features[0].place_name,
                        longitude:data.body.features[0].center[0],
                        latitude:data.body.features[0].center[1],
                    } )
            }
        }

    )

}

module.exports = geocode