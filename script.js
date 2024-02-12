const main = document.querySelector('.main');
const search = document.querySelector('.searchbtn');
const weatherinfo = document.querySelector('.weatherinfo');
const weatherinfo2 = document.querySelector('.weatherinfo2');
const locationerror = document.querySelector('.locationerror');


document.getElementById('searchForm').addEventListener('submit', function(event) {

    event.preventDefault();

    search.click();
});


search.addEventListener('click', () => {

    const APIKey = 'a84d55b8a92eb1454fd5accfed4c87cc';
    const city = document.querySelector('.searcharea input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {

        if (json.cod === '404') {
                main.style.height = '700px';
                weatherinfo.style.display = 'none';
                weatherinfo2.style.display = 'none';
                locationerror.style.display = 'block';
                locationerror.classList.add('fadeIn');
                return;    
        }

        locationerror.style.display = 'none';
        locationerror.classList.remove('fadeIn');

        const image = document.querySelector('.weatherinfo img');
        const tempinfo = document.querySelector('.weatherinfo .tempinfo');
        const dayinfo = document.querySelector('.weatherinfo .dayinfo');
        const humidity = document.querySelector('.weatherinfo2 .humidity span');
        const wind = document.querySelector('.weatherinfo2 .wind span');






        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clearatday.png';
                break;
            case 'Clouds':
                image.src = 'images/cloudyatday.png';
                break;
            case 'Rain':
                image.src = 'images/rainatday.png';
                break;
            case 'Snow':
                image.src = 'images/snowfallatday.png';
                break;
            case 'Smoke':
                image.src = 'images/smoke.png';
                break;
            case 'Haze':
                image.src = 'images/haze.png';
                break;
            case 'Mist':
                image.src = 'images/haze.png';
            case 'Thunderstorm':
                image.src = 'images/stormatday.png';
                break;
            default:
                image.src = '';
        }

        tempinfo.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        dayinfo.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

        weatherinfo.style.display = '';
        weatherinfo2.style.display = '';
        weatherinfo.classList.add('fadeIn');
        weatherinfo2.classList.add('fadeIn');
        main.style.height = '700px';

    });

});