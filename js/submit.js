const requests = [new URL('../server/server-ok.json', import.meta.url), new URL('../server/server-error.json', import.meta.url)]
const submitButton = document.querySelector(`.link-and-button__submit-button`)
const formItems = document.querySelectorAll(`.register-form__item`)

const arrowImg = new URL('../img/Shap.svg', import.meta.url)


// plaseholder color for selects
const nationality = document.querySelector(`#nationality`)
nationality.setAttribute(`style`, `color: #11111148;`)

nationality.addEventListener('input', () => {
	nationality.setAttribute(`style`, `color: #111111;`)
})


const day = document.querySelector(`.birth-days`)
const month = document.querySelector(`.birth-months`)
const year = document.querySelector(`.birth-years`)
day.setAttribute(`style`, `color: #11111148;`)
month.setAttribute(`style`, `color: #11111148;`)
year.setAttribute(`style`, `color: #11111148;`)

day.addEventListener('input', () => {
	day.setAttribute(`style`, `color: #111111;`)
})
month.addEventListener('input', () => {
	month.setAttribute(`style`, `color: #111111;`)
})
year.addEventListener('input', () => {
	year.setAttribute(`style`, `color: #111111;`)
})

















//ERROR CHECKING

submitButton.onclick = () => {

	const firstNameResponse = firstNameValidate()
	const lastNameResponse = lastNameValidate()
	const nationalityResponse = nationalityValue()
	const dateResponse = dateValidate()
	const emailResponse = emailValidate()
	const passResponse = passValidate()
	const genderValue = () => {
		const genderRadio = document.querySelectorAll(`.gender-radio`)
		for (let item of genderRadio) {
			if (item.checked) {
				return item.value
			}
		}
	}

	// checking for validation errors
	if (firstNameResponse
		&& lastNameResponse
		&& nationalityResponse
		&& emailResponse
		&& dateResponse
		&& genderValue()
		&& passResponse
	) {

		// const bodyForRequest = JSON.stringify({
		// 	"firstName": firstNameResponse,
		// 	"lastName": lastNameResponse,
		// 	"nationality": nationalityValue(),
		// 	"email": emailResponse,
		// 	"day": dateResponse.day,
		// 	"month": dateResponse.month,
		// 	"year": dateResponse.year,
		// 	"gender": genderValue(),
		// 	"passWord": passResponse
		// })

		fetch(requests[Math.floor(Math.random() * 2)], {
			method: 'GET',
			credentials: 'same-origin'
		})
			.then(data => data.text())
			.then(data => {

				const modalWindow = document.querySelector(`.register-form__modal-window`)
				const modalWindowButton = document.querySelector(`.register-form__modal-window_button`)
				const modalWindowText = document.querySelector(`.register-form__modal-window_text`)
				const input = document.querySelectorAll(`input`)
				const select = document.querySelectorAll(`select`)
				const title = document.querySelector(`.register-form__title`)
				const subTitle = document.querySelector(`.register-form__subtitle`)
				const success = document.querySelector(`.register-form__success-registration`)




				if (JSON.parse(data).response.status === `ok`) {
					// submitButton.style.opacity = "0"

					// clear inputs and selects
					for (let item of input) {
						item.value = ``
						item.setAttribute(`style`, `background: none;`)
					}
					for (let item of select) {
						item.children[0].selected = true
						item.setAttribute(`style`, `color: #11111148;`)
						item.setAttribute(`style`, `background: none;`)
					}


					// view modal window
					modalWindow.style.zIndex = "3"
					modalWindow.style.opacity = "1"
					modalWindowText.innerHTML = `Регистрация прошла успешно`


					// hidding modal window then submit button click
					modalWindowButton.onclick = () => {
						modalWindow.style.zIndex = "0"
						modalWindow.style.opacity = "0"

						title.setAttribute(`style`, `opacity: 0;`)
						subTitle.setAttribute(`style`, `opacity: 0;`)
						for (let item of formItems) {
							item.style.transitionDelay = `0s`
							item.style.opacity = `0`
						}

						setTimeout(() => {
							success.style.zIndex = "2"
							success.style.opacity = "1"

						}, 1000);
					}


				} else {
					// view modal window
					modalWindow.style.zIndex = "3"
					modalWindow.style.opacity = "1"
					modalWindowText.innerHTML = `Этот эмейл уже зарегестрирован`


					// hidding modal window then submit button click
					modalWindowButton.onclick = () => {
						modalWindow.style.zIndex = "0"
						modalWindow.style.opacity = "0"
					}
				}

			})






	} else {

		// set and remove shaking animation for submit button
		submitButton.style.animation = `shaking 0.2s linear`
		setTimeout(() => {
			submitButton.style.animation = `none`
		}, 200);
	}
}









// first name check
const firstName = document.querySelector(`#firstName`)
const firstNameValidate = () => {
	if (firstName.value.length < 2) {
		addError(`.register-form__first-name`)
	} else {
		removeError(`.register-form__first-name`)
		document.querySelector(`.register-form__input_first-name`).setAttribute(`style`, `background: url(${arrowImg}) no-repeat right;`)
		return firstName.value
	}
}
// remove bg arrow at focus
firstName.onfocus = () => {
	firstName.removeAttribute(`style`)
}




// last name check
const lastName = document.querySelector(`#lastName`)
const lastNameValidate = () => {
	if (lastName.value.length < 2) {
		addError(`.register-form__last-name`)
	} else {
		removeError(`.register-form__last-name`)
		document.querySelector(`.register-form__input_last-name`).setAttribute(`style`, `background: url(${arrowImg}) no-repeat right;`)
		return lastName.value
	}
}
// remove bg arrow at focus
lastName.onfocus = () => {
	lastName.removeAttribute(`style`)
}



const countrySelect = document.querySelector(`#nationality`)
const nationalityValue = () => {
	if (countrySelect.value === `Country`) {
		addError(`.register-form__nationality`)
		return false
	} else {
		return countrySelect.value
	}
}




// date check
const dateValidate = () => {
	let day = document.querySelector(`.birth-days`).value
	let month = document.querySelector(`.birth-months`).value
	let year = document.querySelector(`.birth-years`).value

	let date = new Date(year, --month, day)
	const checkDate = day == date.getDate() && month == date.getMonth() && year == date.getFullYear()

	if (!checkDate) {
		addError(`.register-form__birth`)
	} else {
		removeError(`.register-form__birth`)
		return {
			day,
			month,
			year
		}
	}
}

// email check
const email = document.querySelector(`#email`)
const emailValidate = () => {
	const emailValidate = email.value.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)


	if (!emailValidate) {
		addError(`.register-form__email`)
		document.querySelector(`.register-form__input_email`).removeAttribute(`style`)
	} else {
		removeError(`.register-form__email`)
		document.querySelector(`.register-form__input_email`).setAttribute(`style`, `background: url(${arrowImg}) no-repeat right;`)
		return email.value
	}
}
// remove bg arrow at focus
email.onfocus = () => {
	email.removeAttribute(`style`)
}





// pass check
const pass = document.querySelector(`#pass`)
const confPass = document.querySelector(`#confPass`)
const passValidate = () => {
	const passValidate = pass.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/)


	if (!passValidate) {
		addError(`.register-form__pass`)
		addError(`.register-form__confirm-pass`)
	}
	if (pass.value === confPass.value) {
		if (!passValidate) {
			addError(`.register-form__pass`)
			addError(`.register-form__confirm-pass`)
		} else {
			pass.setAttribute(`style`, `background: url(${arrowImg}) no-repeat right;`)
			confPass.setAttribute(`style`, `background: url(${arrowImg}) no-repeat right;`)
			removeError(`.register-form__pass`)
			removeError(`.register-form__confirm-pass`)
			return pass.value
		}
	} else {
		addError(`.register-form__confirm-pass`)
	}
}
// remove bg arrow at focus
pass.onfocus = () => {
	pass.removeAttribute(`style`)
	confPass.removeAttribute(`style`)
}
confPass.onfocus = () => {
	pass.removeAttribute(`style`)
	confPass.removeAttribute(`style`)
}





const addError = (doc) => {
	document.querySelector(doc).classList.add(`register-form__error`)
}
const removeError = (doc) => {
	document.querySelector(doc).classList.remove(`register-form__error`)
}





// remove error class from item
for (let item of formItems) {
	item.onclick = () => {
		item.classList.remove(`register-form__error`)
	}
}