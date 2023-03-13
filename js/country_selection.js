const requests = [new URL('../server/server-ok.json', import.meta.url), new URL('../server/server-error.json', import.meta.url)]


const http = new XMLHttpRequest()

http.onreadystatechange = () => {
	if(http.readyState === 4 && http.status === 200) {
		func(http.responseText)
	}
}

http.open("GET", requests[1])
http.send()

const func = (data) => {
	// console.log(JSON.parse(data).response.statusText)
}











// const dateCheck = (day, month, year) => {
// 	const date = new Date(year, --month, day)
// 	console.log(date)
// 	return day === date.getDate() && month === date.getMonth() && year === date.getFullYear()
// }

// console.log(dateCheck(9, 3, 2023))