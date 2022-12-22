 export default function fetchCountries(name) {
        const URL = 'https://restcountries.com/v3.1'
        const searchParams = '?fields=name,capital,population,flags,languages'
        return fetch(`${URL}/name/${name}${searchParams}`)
        .then(response => {
        if (!response.ok) {
            throw new Error('error');
        }
        return response.json();
  })
}
