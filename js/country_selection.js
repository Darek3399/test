const requests = [new URL('../server/server-ok.json', import.meta.url), new URL('../server/server-error.json', import.meta.url)]
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
		newItem.innerHTML = `<option value="${countriesArray[i]}">${countriesArray[i]}</option>`
		nationalitySelect.appendChild(newItem)
	}
	
	//years
	const yearsSelect = document.querySelector(`.birth-years`)
	const yearsArray = JSON.parse(data).response.years

	for(let i = 0; i < yearsArray.length; i++) {

		const newItem = document.createElement(`option`)
		newItem.innerHTML = `<option value="${yearsArray[i]}">${yearsArray[i]}</option>`
		yearsSelect.appendChild(newItem)
	}
})



// const dateCheck = (day, month, year) => {
// 	const date = new Date(year, --month, day)
// 	console.log(date)
// 	return day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
// }

// console.log(dateCheck(9, 3, 2023))