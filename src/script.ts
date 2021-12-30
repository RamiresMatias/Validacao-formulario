import isEmail from 'validator/lib/isEmail'

const SHOW_ERROR_MESSAGES = 'show-error-message'
const MESSAGE_FIELD_EMPTY = 'Este campo não pode ser vazio!'
const MESSAGE_PASSWORD_DIFFERENT = 'As duas senhas estão diferentes!'

const form = document.querySelector('.form') as HTMLFormElement
const username = document.querySelector('.username') as HTMLInputElement
const email = document.querySelector('.email') as HTMLInputElement
const password = document.querySelector('.password') as HTMLInputElement
const confirmaPassword = document.querySelector(
  '.confirmPassword',
) as HTMLInputElement

form.addEventListener('submit', function (event) {
  event.preventDefault()
  hideErrorMessages(this)
  checkFormEmptyFields(username, email, password, confirmaPassword)
  checkEmail(email)
  checkEqualPasswords(password, confirmaPassword)
  if (shouldSendForm(this)) this.submit()
})

function checkFormEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) showErrorMessage(input, MESSAGE_FIELD_EMPTY)
  })
}

function checkEqualPasswords(
  password1: HTMLInputElement,
  confirmPassword: HTMLInputElement,
): void {
  if (password1.value !== confirmPassword.value) {
    showErrorMessage(password1, MESSAGE_PASSWORD_DIFFERENT)
    showErrorMessage(confirmPassword, MESSAGE_PASSWORD_DIFFERENT)
  }
}

function checkEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) showErrorMessage(input, 'Email inválido')
}

function hideErrorMessages(form: HTMLFormElement): void {
  form
    .querySelectorAll(`.${SHOW_ERROR_MESSAGES}`)
    .forEach((item) => item.classList.remove(SHOW_ERROR_MESSAGES))
}
function showErrorMessage(input: HTMLInputElement, msg: string): void {
  const formFields = input.parentElement as HTMLDivElement
  const errorMessage = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement
  errorMessage.innerText = msg
  formFields.classList.add(SHOW_ERROR_MESSAGES)
}

function shouldSendForm(form: HTMLFormElement): boolean {
  let send = true
  form.querySelectorAll(`.${SHOW_ERROR_MESSAGES}`).forEach(() => (send = false))
  return send
}
