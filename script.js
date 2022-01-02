const username = document.querySelector('#username')
const pass = document.querySelector('#password')
const pass2 = document.querySelector('#password2')
const email = document.querySelector('#email')
const sendBtn = document.querySelector('.send')
const clearBtn = document.querySelector('.clear')
const popup = document.querySelector('.pop-up')

const showError = (input, msg) => {
	//argument input przechowuje nasze elementy
	//argument msg przechowuje placeholder

	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error-text')

	formBox.classList.add('error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('error')
}

const checkForm = input => {
	input.forEach(el => {
		if (el.value === '') {
			showError(el, el.placeholder)
		} else {
			clearError(el)
		}
	})
}

//argument input z funkcji "checkForm", przechowuję tablicę z naszymi inputami
//arument el odnosi sie do każdej zmiennej, która umieśclismy w tablicy

const checkLength = (input, min) => {
	// console.log(min);
	// console.log(input);
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} must contain ${min} characters.`)
	}
}

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Passwords do not match!')
	}
}

const checkMail = email => {
	const re =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	if (re.test(email.value)) {
		clearError(email)
	} else {
		showError(email, 'Email is incorrect!')
	}
}

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box')
	let errorCount = 0

	allInputs.forEach(el => {
		if(el.classList.contains('error')){
			errorCount++
		}
	});

	if(errorCount === 0){
		popup.classList.add('show-popup')
	}
	
	console.log(errorCount);
}


sendBtn.addEventListener('click', e => {
	e.preventDefault()

	checkForm([username, pass, pass2, email])

	checkLength(username, 3)
	checkLength(pass, 8)
	checkPassword(pass, pass2)
	checkMail(email)
	checkErrors()
})

clearBtn.addEventListener('click', e => {
	e.preventDefault()
	;[username, pass, pass2, email].forEach(el => {
		el.value = ''
		clearError(el)
	})
})


