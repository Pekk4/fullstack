import axios from 'axios'

const getWeather = (city) => {
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?` +
    `q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`

    return axios.get(baseUrl)
}

export default { getWeather }
