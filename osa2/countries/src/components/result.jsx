import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Result = ({ result }) => {
    const [weather, setNewWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getWeather(result.capital[0])
            .then(response => {
                console.log(response.data)
                setNewWeather(response.data)
            })
    }, [result.capital])

    if (!weather) {
        return null
    }

    return (
        <div>
            <h1>{result.name.common}</h1>
            <p><b>Capital:</b> {result.capital[0]}</p>
            <p><b>Area:</b> {result.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(result.languages).map(lang =>
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <br />
            <img src={result.flags.png} alt='flag' />
            <br />
            <h2>Weather in {result.capital[0]}</h2>
            <p>Temperature: {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon' />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Result
