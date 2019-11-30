const formSection = document.querySelector('.form-section');
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const formSectionHeader = document.querySelector('.form-sec-header');
const searchOutputSection = document.querySelector('.search-output-section');
const addDialog = document.querySelector('.dialog-container');
const btnChangeTemptScale = document.getElementById('butAdd');

const proxy = 'http://cors-anywhere.herokuapp.com/';
const resultContainer = document.querySelector('.search-result');


let tempratureScale = 'fahrenheit';

const toggleAddDialog = function (visible) {
  if (visible) {
    addDialog.classList.add('dialog-container--visible');
  } else {
    addDialog.classList.remove('dialog-container--visible');
  }
};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
  formSectionHeader.classList.add('form-sec-header--search-active');
  searchOutputSection.classList.add('search-output-section--active');
  const searchString = searchInput.value;
  geoEncode(searchString)
})



searchInput.addEventListener('keyup', () => {
  console.log('pressed ',searchInput.value.length);
  if(searchInput.value.length < 1){
    console.log('empty input');
      formSectionHeader.classList.remove('form-sec-header--search-active');
      searchOutputSection.classList.remove('search-output-section--active');
  }
});


btnChangeTemptScale.addEventListener('click', () => {
    // Open/show the add new city dialog
    toggleAddDialog(true);
  });

const optionsFer = document.querySelector('input[type="radio"][value="fahrenheit"]');
const optionsCel = document.querySelector('input[type="radio"][value="celsius"]');

optionsFer.addEventListener('click', () => {
  tempratureScale = 'fahrenheit';
});

optionsCel.addEventListener('click', () => {
  tempratureScale = 'celsius';
});


document.getElementById('butAddCity').addEventListener('click', () => {
	console.log(tempratureScale);
	changeTempratureScale(tempratureScale);
});

document.getElementById('butAddCancel').addEventListener('click', () => {
  toggleAddDialog(false);
});

function changeTempratureScale(scale) {
  if (tempratureScale === '') {
    btnChangeTemptScale.textContent = 'Temprature in: °F';
  }else {
    btnChangeTemptScale.textContent = 'Temprature in: °C';
  }

  toggleAddDialog(false);
}
// 
function geoEncode(searchString){
    // this will be gotten from mapquestapi.com
    const key = 'A6BOoHaJ8ONRZGyHAo740zSfjwa2rYxw';
    const api = `https://www.mapquestapi.com/geocoding/v1/address?key=${key}&inFormat=kvp&outFormat=json&location=${searchString}&thumbMaps=false&maxResults=5`;
    document.querySelector('.loader').style.display = 'loading....';
    fetch(api)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            // document.querySelector('.result').textContent = JSON.stringify(data);
            console.log('Data: ',data);

            const locations = data.results[0].locations;
            const locationsLenght = Object.keys(locations).length;

            // resultContainer.innerHTML = '';
            
            let i;

            for(i = 0; i < locationsLenght; i++){
                const {adminArea1, adminArea2, adminArea3, adminArea4, adminArea5, adminArea6} = locations[i]

                const {lat, lng} = locations[i].latLng;

                // weather = getWeather(lat, lng);
                // const {temperature, humidity, summary, icon} = await weather.currently;
        
                console.log(adminArea1, 'adminArea2: ,', adminArea2, 'adminArea3 ,', adminArea3, 'adminArea4 ,', adminArea4, 'adminArea5 ,', adminArea5, 'adminArea6 ,', adminArea6);
                console.log('long: '+ lng + 'Lat: '+lat);

                const resultTemplate = document.querySelector('.cardTemplate').cloneNode(true);
                resultTemplate.removeAttribute('hidden');
                resultTemplate.classList.remove('cardTemplate')

                const name = addName(adminArea5) + addName(adminArea4) + addName(adminArea3) + addName(adminArea2) + adminArea1;
                const imgsrc = `https://www.mapquestapi.com/staticmap/v5/map?key=${key}&center=${lat},${lng}&size=300,300`
                
                resultTemplate.querySelector('.location').textContent = name;
                resultTemplate.querySelector('iframe').setAttribute('src', imgsrc);
                resultTemplate.querySelector('.temperature .value').textContent = temperature;
                resultTemplate.querySelector('.humidity').textContent = humidity;
                resultContainer.appendChild(resultTemplate);
            }
            document.querySelector('.loader').innerHTML = '';

           
        })
        .catch( error => {
            console.log(error);
            resultContainer.textContent = 'an error occured';
        })
}


function addName(name){
    if(name === undefined || name === null || name.length === 0){
        return ''
    }
    return `${name}, `
}

function getWeather(lat, lng){
    //use the data provided to get the weather conditon of the place
      const proxy = 'http://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/32ba56ee9febcd65150fb798a301ea31/${lat},${lng}`;

      fetch(api)
      .then(response => {
          return response.json();
      })
      .then(data =>{
          console.log('Data: ', data);
          const {temperature, summary, icon} = data.currently;
          console.log('temp: ',temperature,'summary: ',summary);
          return data.currently;

          // Set dom elements
          // tempratureDegree.textContent = temperature;
          // tempratureDescription.textContent = summary;
          // locationTimezone.textContent = data.timezone; 

          // FORMULAR FOR CELCIUS
          // let celcius =  (temperature - 32) * (5/9);

          // setIcons(icon, document.querySelector('.icon'));

          // Change temprature to celcius
          // tempratureSection.addEventListener('click', () => {
          //     if(tempratureSectionSpan.textContent === 'F'){
          //         tempratureSectionSpan.textContent = 'C';
          //         tempratureDegree.textContent = Math.floor(celcius);
          //     }else{
          //         tempratureSectionSpan.textContent = 'F';
          //         tempratureDegree.textContent = temperature;
          //     }
          // });
      })
      .catch(error => {
        console.warn(error);
        return error;
      })
       
}

function convertToCelsius() {

}

function convertToFahrenheit() {

}



