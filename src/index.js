import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import fetchCountries from './fetch_countries';

const DEBOUNCE_DELAY = 300;
let searchCountry = '';


const refs = {
    form: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.form.addEventListener('input', debounce(onInputSearchForm, DEBOUNCE_DELAY))

function onInputSearchForm(event) {
    searchCountry = event.target.value.trim();

    if (searchCountry === '') {
        clearRender();
        return
    }
        fetchCountries(searchCountry)
        .then(renderMarkup)
        .catch(onError)
}
function renderListCountries(element) {
    const markupListCountries = `
    <li class="countries">
        <img src="${element.flags.svg}" alt="Flag" width="30" height="30" class="img">
        <p class="countries_name">${element.name.official}</p>
    </li>`
    // clearRender()
    refs.countryList.insertAdjacentHTML('beforeend', markupListCountries);
}
function renderCountry(element) {
    const markupCountry = `
    <ul class="country">
        <li class="countries_list">
            <img src="${element.flags.svg}" alt="Flag" width="30" height="30" class="img">
            <p class="country_name">${element.name.official}</p></li>
        <li class="properties"><span class="title">Capital: </span> ${element.capital}</li>
        <li class="properties"><span class="title">Population: </span> ${element.population}</li>
        <li class="properties"><span class="title">Languages: </span> ${Object.values(element.languages).join(", ")}</li>
    </ul>`
    // clearRender();
    refs.countryInfo.insertAdjacentHTML('beforeend', markupCountry)  
    
}
function clearRender() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = ''
}
function renderMarkup(countries) {
        clearRender()
      if (countries.length === 1) {
        countries.map(renderCountry)
    } if (countries.length > 1 && countries.length <= 10) {
        countries.map(renderListCountries)
    } if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
    } 
}
function onError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    clearRender()
}