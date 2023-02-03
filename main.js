import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('#chat__container__form'),
    chatContainer = document.querySelector('#chat__container__chats__content')

let loadInterval

const loader = (element) => {
    element.textContent = ''
    loadInterval = setInterval(() => {
        element.textContent += '.'
        if (element.textContent === '....')
            element.textContent = ''

    }, 300)
}

const typeText = (element, text) => {
    let index = 0;
    let interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index)
            index++
        } else {
            clearInterval(interval)
        }
    }, 20)

}

const generateUniqueId = () => {
    const timestamp = Date.now(),
        randomNumber = Math.floor(Math.random() * 1000000),
        hexadecimalString = randomNumber.toString(16)
    return `id-${timestamp}-${randomNumber}-${hexadecimalString}`

}


const generateChatStripe = (isAi, value, uniqueId) => {
    return `<div class="chat__container__chat ${isAi ? 'bot' : 'user'}">
            <img src="${isAi ? bot : user}" alt="${isAi ? 'bot-icon' : 'user-icon'}"/>
            <div id="chat__container__chat__message">
                <p id="${uniqueId}">${value}</p>
            </div>
        </div>
        `
}

const onSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(form)

    chatContainer.innerHTML += generateChatStripe(false, data.get('input'))

    form.reset()

    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += generateChatStripe(true, " ", uniqueId)

    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.querySelector(`#${uniqueId}`)
    loader(messageDiv)
}

form.addEventListener('submit', onSubmit)
form.addEventListener('keydown ', (e) => {
    if (e.keyCode === 13) {
        onSubmit(e)
    }
})