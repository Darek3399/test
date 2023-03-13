const requests = [new URL('../server/server-ok.json', import.meta.url), new URL('../server/server-error.json', import.meta.url)]
const submitButton = document.querySelector(`.link-and-button__submit-button`)
const formItems = document.querySelectorAll(`.register-form__item`)



                                                                                     //ERROR CHECKING

submitButton.onclick = () => {
	firstNameValidate()
	lastNameValidate()
	dateValidate()
	emailValidate()
	passValidate()
}



// first name check
const firstNameValidate = () => {
	const firstName = document.querySelector(`#firstName`).value
	if(firstName.length < 2) {
		document.querySelector(`.register-form__first-name`).classList.add(`register-form__error`)
	}
}

// last name check
const lastNameValidate = () => {
	const lastName = document.querySelector(`#lastName`).value
	if(lastName.length < 2) {
		document.querySelector(`.register-form__last-name`).classList.add(`register-form__error`)
	}
}

// date check
const dateValidate = () => {
	let day = document.querySelector(`.birth-days`).value
	let month = document.querySelector(`.birth-months`).value
	let year = document.querySelector(`.birth-years`).value

	let date = new Date(year, --month, day)
	const checkDate = day == date.getDate() && month == date.getMonth() && year == date.getFullYear()

	if(!checkDate) {
		document.querySelector(`.register-form__birth`).classList.add(`register-form__error`)
	}
}

// email check
const emailValidate = () => {
	const email = document.querySelector(`#email`).value

	const emailValidateResult = email.match(
	  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)
	if(!emailValidateResult) {
		document.querySelector(`.register-form__email`).classList.add(`register-form__error`)
	}
 }

// pass check
const passValidate = () => {
	const pass = document.querySelector(`#pass`).value
	const confPass = document.querySelector(`#confPass`).value

	if(pass === confPass) {
		const passValidateResult = pass.match(
		  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
		)
		if(!passValidateResult) {
			document.querySelector(`.register-form__pass`).classList.add(`register-form__error`)
			document.querySelector(`.register-form__confirm-pass`).classList.add(`register-form__error`)
		}
	}else {
		document.querySelector(`.register-form__confirm-pass`).classList.add(`register-form__error`)
	}
 }








// remove error class from item
for (let item of formItems) {
	item.onclick = () => {
		item.classList.remove(`register-form__error`)
	}
}