const { Telegraf } = require('telegraf');
const http = require('http');
const bot = new Telegraf(process.env.BOT_TOKEN);

// سيرفر وهمي لإبقاء الخدمة تعمل على Render المجاني
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Bot is Active");
});
server.listen(process.env.PORT || 3000);

bot.start((ctx) => {
    ctx.reply(`🌟 **Welcome to Fenntel** 🌟\n\nYour simple gateway to digital growth and psychological mastery.`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📖 Get FREE Book (One)", callback_data: "send_free" }],
                [{ text: "💳 Purchase Premium Book (Two)", callback_data: "show_payment" }],
                [{ text: "📞 Contact Support", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

bot.action('send_free', (ctx) => {
    ctx.reply('Sending your free gift... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch(err => {
        ctx.reply('The file is being prepared, please try again in a moment.');
    });
});

bot.action('show_payment', (ctx) => {
    ctx.reply(`🏦 **Order Details: Premium Book (Two)**\n\nTo complete your purchase, please transfer **$12.79** to:\n\n\`GB64CLJU04130741739018\`\n\n⚠️ After payment, send the screenshot to @Mohamedlebah to receive your file.`, { 
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [[{ text: "⬅️ Back to Menu", callback_data: "start_over" }]]
        }
    });
});

bot.action('start_over', (ctx) => {
    ctx.editMessageText("🌟 Choose an option:");
});

bot.launch();
