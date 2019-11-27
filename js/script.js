'use strict';

const formSection = document.querySelector('.form-section');
const searchInput = document.querySelector('.search-input');
const formSectionHeader = document.querySelector('.form-sec-header');
const searchOutputSection= document.querySelector('.search-output-section');
const addDialog = document.querySelector('.dialog-container');
const btnChangeTemptScale = document.getElementById('butAdd');

let tempratureScale = 'fahrenheit';

const toggleAddDialog = function(visible) {
    if (visible) {
      addDialog.classList.add('dialog-container--visible');
    } else {
      addDialog.classList.remove('dialog-container--visible');
    }
};

searchInput.addEventListener('focus', ()=>{
		console.log('Active input');
		// formSection.classList.add('form-section--search-active');
		formSectionHeader.classList.add('form-sec-header--search-active');
		searchOutputSection.classList.add('search-output-section--active');
	});

searchInput.addEventListener('blur', ()=>{
		console.log('blured');
		// formSection.classList.remove('form-section--search-active');
		formSectionHeader.classList.remove('form-sec-header--search-active');
		searchOutputSection.classList.remove('search-output-section--active');
	});


btnChangeTemptScale.addEventListener('click', function() {
    // Open/show the add new city dialog
    toggleAddDialog(true);
  });

const optionsFer = document.querySelector('input[type="radio"][value="fahrenheit"]');
const optionsCel = document.querySelector('input[type="radio"][value="celsius"]');

optionsFer.addEventListener('click', ()=>{
	tempratureScale = 'fahrenheit';
})

optionsCel.addEventListener('click', () =>{
	tempratureScale = 'celsius';
})


document.getElementById('butAddCity').addEventListener('click', function(){
	console.log(tempratureScale);
	changeTempratureScale(tempratureScale);
})

document.getElementById('butAddCancel').addEventListener('click', ()=>{
	toggleAddDialog(false);
});

function changeTempratureScale(scale){
	if(tempratureScale === ''){
		btnChangeTemptScale.textContent = 'Temprature in: °F'
	}else{
		btnChangeTemptScale.textContent = 'Temprature in: °C'
	}

	toggleAddDialog(false);
}

function convertToCelsius(){

}

function convertToFahrenheit(){
	
}



