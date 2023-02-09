const operations = document.querySelector('.calculator-operations')
const data = document.querySelector('.calculator-data')
const result = document.querySelector('.calculator-result')
const btns = document.querySelectorAll('.calculator-btn')

const placeholder = 'Calculate something'
let equalPressed = false
let resetPressedConsec = 0
let resetPressed = false

const themeBtn = document.querySelector('.theme-changer')
const darkThemeBtnColor = '#555'
const darkBtnHoverColor = '#666'
const themeBtnColor = '#ddd'
const btnHoverColor = '#ccc'
const head = document.querySelector('.header')
const line = document.querySelector('.line')
let themeChanged = false
const darkColor = '#333'
const lightColor = 'ghostwhite'
const placeholderColor = 'darkgray'

function init() {
	btns.forEach(btn => {
		const keyInfo = btn.innerHTML
		btn.addEventListener('click', () => {
			detectBtn(keyInfo)
		})
	})
	document.addEventListener('keydown', e => {
		const keyInfo = e.key
		detectKey(keyInfo)
	})

	// Theme Stuff
	themeBtn.addEventListener('mouseenter', hoverThemeBtn)
	themeBtn.addEventListener('mouseleave', hoverOutThemeBtn)
	btns.forEach(btn => {
		btn.addEventListener('mouseenter', () => hoverBtn(btn))
		btn.addEventListener('mouseleave', () => hoverOutBtn(btn))
	})
	themeBtn.addEventListener('click', changeTheme)
}

function detectBtn(keyInfo) {
	switch (keyInfo) {
		case 'AC':
			reset()
			break
		case 'DEL':
			dlt()
			break
		case '=':
			calculate()
			break
		default:
			update(keyInfo)
			break
	}
}
function detectKey(keyInfo) {
	if (
		keyInfo === '0' ||
		keyInfo === '1' ||
		keyInfo === '2' ||
		keyInfo === '3' ||
		keyInfo === '4' ||
		keyInfo === '5' ||
		keyInfo === '6' ||
		keyInfo === '7' ||
		keyInfo === '8' ||
		keyInfo === '9' ||
		keyInfo === '%' ||
		keyInfo === '/' ||
		keyInfo === '*' ||
		keyInfo === '-' ||
		keyInfo === '+' ||
		keyInfo === '.'
	) {
		update(keyInfo)
	} else if (keyInfo === 'Escape') {
		reset()
	} else if (keyInfo === 'Backspace') {
		dlt()
	} else if (keyInfo === 'Enter') {
		calculate()
	}
}

function reset() {
	resetPressedConsec++

	data.style.color = placeholderColor
	data.innerHTML = placeholder
	result.innerHTML = 0

	equalPressed = false

	if (resetPressedConsec === 2) {
		for (let i = operations.children.length - 1; i >= 0; i--) {
			operations.removeChild(operations.children[i])
		}
		resetPressedConsec = 0
	}
}
function dlt() {
	if (!equalPressed && data.innerHTML !== placeholder) {
		let dataArray = Array.from(data.innerHTML)
		dataArray.pop()
		const dataString = dataArray.toString().replaceAll(',', '')
		data.innerHTML = dataString

		if (data.innerHTML === '') {
			data.style.color = placeholderColor
			data.innerHTML = placeholder
		}
	}
}
function calculate() {
	result.innerHTML = eval(data.innerHTML)
	equalPressed = true

	updateOperations()
}
function update(keyInfo) {
	resetPressedConsec = 0

	if (data.innerHTML === placeholder) {
		data.style.color = darkColor
		if (themeChanged) {
			console.log(themeChanged)
			data.style.color = lightColor
		}

		data.innerHTML = ''
	}

	if (equalPressed) {
		data.innerHTML = ''
		equalPressed = false

		if (
			keyInfo == '%' ||
			keyInfo == '/' ||
			keyInfo == '*' ||
			keyInfo == '-' ||
			keyInfo == '+'
		) {
			data.innerHTML = result.innerHTML
		}
	}
	data.innerHTML += keyInfo
}

function updateOperations() {
	const operation = document.createElement('div')
	operation.className = 'operation'
	operation.innerHTML = `
    <p class="expression">${data.innerHTML}</p>
    <p class="result">=${result.innerHTML}</p>
  `
	operations.appendChild(operation)
}

function changeTheme() {
	if (!themeChanged) {
		changeToDarkMode()
		return
	}
	changeToLightMode()
}
function changeToDarkMode() {
	document.body.style.color = lightColor
	document.body.style.backgroundColor = darkColor

	data.style.color = lightColor

	head.style.borderBottomColor = lightColor
	themeBtn.style.borderColor = lightColor
	themeBtn.style.backgroundColor = darkThemeBtnColor
	themeBtn.title = 'Change to Light mode'

	line.style.borderBottomColor = lightColor

	themeChanged = true
}
function changeToLightMode() {
	document.body.style.color = darkColor
	document.body.style.backgroundColor = lightColor

	data.style.color = darkColor

	head.style.borderBottomColor = darkColor
	themeBtn.style.borderColor = darkColor
	themeBtn.style.backgroundColor = themeBtnColor
	themeBtn.title = 'Change to Dark mode'

	line.style.borderBottomColor = darkColor

	themeChanged = false
}

function hoverThemeBtn() {
	if (themeChanged) {
		themeBtn.style.backgroundColor = darkBtnHoverColor
		return
	}
	themeBtn.style.backgroundColor = btnHoverColor
}
function hoverOutThemeBtn() {
	if (themeChanged) {
		themeBtn.style.backgroundColor = darkThemeBtnColor
		return
	}
	themeBtn.style.backgroundColor = themeBtnColor
}

function hoverBtn(btn) {
	if (themeChanged) {
		btn.style.backgroundColor = darkBtnHoverColor
		return
	}
	btn.style.backgroundColor = btnHoverColor
}
function hoverOutBtn(btn) {
	btn.style.backgroundColor = 'transparent'
}

window.addEventListener('load', init)
