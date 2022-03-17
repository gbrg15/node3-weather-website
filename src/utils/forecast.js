const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url  = 'http://api.weatherstack.com/current?access_key=0ccf02ae8640d9159953366d85e1fdde&query='+longitude+','+latitude+'&units=f'
    request({url, json:true }, (error, {body}) => {
    if (error){
        callback('Unable to connect to weather app')
    } else if (body.error) {
        callback('Unable to find location')
    } 
    else {
        
        callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} out there. There is a ${body.current.precip}% chance of rain`)
    }
}) 
    
}

module.exports = forecast