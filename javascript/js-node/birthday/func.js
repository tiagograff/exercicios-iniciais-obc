import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

export default function validateBirthdayString(dateString) {
    if (dateString.trim() === '') {
        throw new Error('Data não informada')
    }

    const birthday = dayjs(dateString, "DD/MM/YYYY", true).startOf('day');

    if (!birthday.isValid()) {
        throw new Error('Data inválida')
    } else {
        dateInfos(birthday)
    }
}

const dateInfos = (birthday) => {
    const today = dayjs().startOf('day');

    if (birthday.isAfter(today)) {
        throw new Error('Não é possível informar uma data futura')
    }

    let nextBirthday = birthday.year(today.year()).startOf('day')

    if (nextBirthday.isBefore(today, 'day')) {
        nextBirthday = nextBirthday.add(1, 'year')
    }

    let daysToNextBirthday = nextBirthday.diff(today, 'day')
    let age = today.diff(birthday, 'year')

    const nextBirthdayText = daysToNextBirthday === 0
        ? "Hoje!"
        : nextBirthday.format("DD/MM/YYYY");

    console.log(`
        Data de Aniversário: ${birthday.format("DD/MM/YYYY")}
        Próximo aniversário: ${nextBirthdayText}
        Faltam: ${daysToNextBirthday} dias
        Idade Atual: ${age}
        `);
}