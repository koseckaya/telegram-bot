
const TelegramApi = require('node-telegram-bot-api')

const token = '6695668366:AAE4R6slLx3Hufi31eA5j4kJ03dfIZwIef4'

const bot = new TelegramApi(token, { polling: true })

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: ' 1 ', callback_data: '1' }, { text: ' 2 ', callback_data: '2' }, { text: ' 3 ', callback_data: '3' }],
            [{ text: ' 4 ', callback_data: '4' }, { text: ' 5 ', callback_data: '5' }, { text: ' 6 ', callback_data: '6' }],
            [{ text: ' 7 ', callback_data: '7' }, { text: ' 8 ', callback_data: '8' }, { text: ' 9 ', callback_data: '9' }],
            [{ text: '0', callback_data: '0' }],
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Play again', callback_data: '/again' }],
        ]
    })
}


bot.setMyCommands([
    { command: '/start', description: 'Starting welcome' },
    { command: '/info', description: 'Get user information' },
    { command: '/game', description: 'Play the game' },
])

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Guess the number from 0 to 9 `)
    const randNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randNumber
    await bot.sendMessage(chatId, `Guess`, gameOptions)
}

const start = () => {
    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            await bot.sendMessage(chatId, `Hello in our bot`)
            return bot.sendSticker(chatId, `https://stickerswiki.ams3.cdn.digitaloceanspaces.com/WhatIfJust/5806511.512.webp`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Is your name ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/game') startGame(chatId)

        return bot.sendMessage(chatId, `Try one more time`)
    })

    bot.on('callback_query', msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') startGame(chatId)
        
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Congratulations you're guess number ${data}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Sorry it's number ${chats[chatId]}`, againOptions)
        }

    })
}

start()