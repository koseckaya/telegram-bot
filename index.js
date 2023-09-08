
const TelegramApi = require('node-telegram-bot-api')

const token = '6695668366:AAE4R6slLx3Hufi31eA5j4kJ03dfIZwIef4'

const bot = new TelegramApi(token, { polling: true })

const chats = {}



bot.setMyCommands([
    {command: '/start', description: 'Starting welcome'},
    {command: '/info', description: 'Get user information'},
    {command: '/game', description: 'Play the game'},
])

bot.on('message', async (msg) => {
    const text = msg.text
    const chatId = msg.chat.id
   
    if (text === '/start') {
       await  bot.sendMessage(chatId, `Hello in our bot`)
        return bot.sendSticker(chatId, `https://telegramchannels.me/storage/stickers/keanureevess1ick3r/big_keanureevess1ick3r_15.png`)
    }
    if (text === '/info') await bot.sendMessage(chatId, `Is your name ${msg.from.first_name} ${msg.from.last_name}`)

    if (text === '/game') {
        await bot.sendMessage(chatId, `Guess the number from 0 to 9 `)
        const randNumber = Math.floor(Math.random() * 10)
        chats[chatId] = randNumber
        await bot.sendMessage(chatId, `Guess`)
    }

    return bot.sendMessage(chatId, `Try one more time`)
})