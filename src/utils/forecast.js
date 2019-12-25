const request= require('request')

const forecast = (latitude,longitude ,callback)=>{
    const url= 'https://api.darksky.net/forecast/3201269345429a0b48b191b6c3b0af06/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect ot the weather service',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.daily.data[0].summary+' It is curently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain. Low and High temperatures being '+body.daily.data[0].temperatureLow +' degrees and '+body.daily.data[0].temperatureHigh +' degrees respectively.')
        }
    })
}

module.exports= forecast