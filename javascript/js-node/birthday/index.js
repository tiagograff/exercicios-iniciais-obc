import validateBirthdayString from './func.js'
import promptSync from 'prompt-sync'
const prompt = promptSync()

const birthday = prompt('Digite sua data de nascimento (dd/mm/aaaa): ')
validateBirthdayString(birthday)