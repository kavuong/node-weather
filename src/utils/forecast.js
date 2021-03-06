const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c9eaae73706bd6a2ae597ddbeca1c886/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true}, (error, {body}) => {
        if (error){
            callback("unable to connect to service")
        } else if (body.error){
            callback(body.error)
        } else {
            dailySummary = body.daily.data[0].summary
            temperature = body.currently.temperature
            precipProb = body.currently.precipProbability
            tempHigh = body.daily.data[0].temperatureHigh
            tempLow = body.daily.data[0].temperatureLow

            callback(undefined, 
                dailySummary + ". It is currently " + temperature + " degrees out. There is a " 
                + precipProb + "% chance of rain. " + "High of " + tempHigh + " degrees and low of " +
                tempLow + " expected today.")
        }
    })

}

module.exports = forecast