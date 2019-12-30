const request = require('request')


const geocode = (address, callback) => {
    // encodeURIComponent handles special characters in input
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoia2F2dW9uZyIsImEiOiJjazRrdmkzdzgwNGRlM2Zud25wdGtzZm1qIn0.2gA0nSwzk_xA72UMqMnVSg'
    request({ url, json: true }, (error, {body}) => {
        if (error){
            // data parameter in callback is undefined
            // done to make error handling more flexible - this message can be handled by the callback per the coder's request
            callback('Unable to connect to service.')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please find another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode