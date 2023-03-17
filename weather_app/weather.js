import axios from "axios"

export function getWeather(lat,long,timezone) {
    return axios.get(
        "https://api.open-meteo.com/v1/forecast?hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timeformat=unixtime",{ params: {
        latitude: lat,
        longitude: long,
        timezone,
    },
    }).then(({data}) => {
   
    //return data
    return {
        current: parseCurrentWeather(data) ,
        daily: parseDailyWeather(data),
       
        hourly: parseHourlyWeather(data)
    }
})   
}

function parseCurrentWeather({current_weather, daily}) {
    const { temperature: currentTemp,
        windspeed: windSpeed, 
        weathercode: iconCode} = current_weather
    console.log(current_weather,daily)
    const { temperature_2m_max: [highTemp],
        temperature_2m_min: [lowTemp],
        apparent_temperature_max: [highFeelsLike],
        apparent_temperature_min: [lowFeelsLike],
        precipitation_sum: [precipitation] } = daily
    console.log(highTemp)
        return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(highTemp),
        lowTemp: Math.round(lowTemp),
        highFeelsLike: Math.round(highFeelsLike),
        lowFeelsLike: Math.round(lowFeelsLike),
        windSpeed: Math.round(windSpeed),
        precipitation: Math.round(precipitation*100)/100,
        iconCode,
    }
}
function parseDailyWeather({daily}) {
    console.log(daily.time)
    const arr = daily.time.map((time,index) => {
        return { 
            timestamp: time * 1000,
            iconCode: daily.weathercode[index],
            highTemp: Math.round(daily.temperature_2m_max[index])
        }

    })
    console.log(arr)
    return arr
    
    
}

function parseHourlyWeather({hourly,current_weather}) {
    return hourly.time.map((a,index) => {
        return {
            timestamp: a*1000,
            iconCode: hourly.weathercode[index],
            temperature: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.windspeed_10m[index]),
            precipitation: Math.round(hourly.precipitation[index]*100)/100,
        }

    }).filter(({timestamp}) => timestamp >= current_weather.time * 1000)
}