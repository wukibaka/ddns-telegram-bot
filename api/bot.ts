import { VercelRequest, VercelResponse } from '@vercel/node'
import { Bot, InlineKeyboard, webhookCallback } from 'grammy'

const { BOT_TOKEN, BOT_URL } = process.env

export const bot = new Bot(BOT_TOKEN)

bot.command('start', async (ctx) => {
    await ctx.reply('欢迎使用DDNS Bot')
})

bot.command('gethook', async (ctx) => {
    const chanId = ctx.message.chat.id
    const hookUrl = `${BOT_URL}/api/hook/${chanId}`
    const links = new InlineKeyboard()
        .url('Usage', 'https://github.com/wukibaka/ddns-telegram-bot/blob/main/README.md')
    await ctx.reply(`你的Webhook URL是:\n ${hookUrl}`, {
        reply_markup: links
    })
})

export default async (req: VercelRequest, res: VercelResponse) => {
    webhookCallback(bot, 'http')(req, res)
}
