const countries = new URL('../server/countries_dates.json', import.meta.url)

// get and set in html countries and years
fetch(countries, {
	method: `GET`, 
	credentials: 'same-origin',
}
)
.then( data => data.text())
.then( data => {


	//countries
	const nationalitySelect = document.querySelector(`#nationality`)
	const countriesArray = JSON.parse(data).response.countries

	for(let i = 0; i < countriesArray.length; i++) {

		const newItem = document.createElement(`option`)
		newItem.value = countriesArray[i]
		newItem.innerHTML = countriesArray[i]
		nationalitySelect.append(newItem)
	}
	
	//years
	const yearsSelect = document.querySelector(`.birth-years`)
	const yearsArray = JSON.parse(data).response.years

	for(let i = 0; i < yearsArray.length; i++) {

		const newItem = document.createElement(`option`)
		newItem.innerHTML = `<option value="${yearsArray[i]}">${yearsArray[i]}</option>`
		yearsSelect.append(newItem)
	}
})