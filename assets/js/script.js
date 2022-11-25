const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const notFound = document.querySelector('.not-found')
const APIKey = '33ce53fdc7f487e48f74035dd67eeb33'

search.addEventListener('click', () => {
  const nameCity = document.querySelector('.search-box input').value

  if (nameCity === '') {
    return
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&units=metric&lang=pt_br&appid=${APIKey}`
  )
    .then(data => data.json())
    .then(resp => {
      if (resp.cod === '404') {
        weatherBox.style.display = 'none'
        weatherDetails.style.display = 'none'
        container.style.height = '400px'
        notFound.style.display = 'block'
        notFound.classList.add('fadeIn')

        return
      }

      notFound.style.display = 'none'
      notFound.classList.remove('fadeIn')

      const imageWeather = document.querySelector('.weather-box img')
      const temperature = document.querySelector('.weather-box .temperature')
      const description = document.querySelector('.weather-box .description')
      const humidity = document.querySelector('.weather-details .humidity span')
      const wind = document.querySelector('.weather-details .wind span')

      switch (resp.weather[0].main) {
        case 'Clear':
          imageWeather.src = '.././assets/images/clear.svg'
          break
        case 'Rain':
          imageWeather.src = '.././assets/images/rain.svg'
          break
        case 'Snow':
          imageWeather.src = '.././assets/images/snow.svg'
          break
        case 'Clouds':
          imageWeather.src = '.././assets/images/cloud.svg'
          break
        case 'Haze':
          imageWeather.src = '.././assets/images/haze.svg'
          break
        case 'Mist':
          imageWeather.src = '.././assets/images/mist.svg'
          break
        default:
          imageWeather.src = '.././assets/images/mist.svg'
          break
      }

      temperature.innerHTML = `${parseInt(resp.main.temp)}<span>°C</span>`
      description.innerHTML = `${resp.weather[0].description}`
      humidity.innerHTML = `${resp.main.humidity}%`
      wind.innerHTML = `${parseInt(resp.wind.speed)}Km/h`

      weatherBox.style.display = ''
      weatherDetails.style.display = ''
      weatherBox.classList.add = 'fadeIn'
      weatherDetails.classList.add = 'fadeIn'
      container.style.height = '600px'
    })
})
