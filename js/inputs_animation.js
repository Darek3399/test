const items = document.querySelectorAll(`.register-form__item`)

window.onload = () => {
	for(let i = 0; i < items.length; i++) {
		items[i].style.opacity = `1`
	}
}