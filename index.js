const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// رسالة الترحيب
bot.start((ctx) => {
    ctx.reply('Welcome! Click the button below to get your FREE book.', {
        reply_markup: {
            inline_keyboard: [[{ text: "Download Book 1 📥", callback_data: "send_b1" }]]
        }
    });
});

// إرسال الكتاب الأول
bot.action('send_b1', (ctx) => {
    ctx.reply('Sending your book... 🚀');
    ctx.replyWithDocument({ source: './B1_PREMIUM_FINAL.pdf' });
    
    // عرض شراء الكتاب الثاني بعد ثوانٍ
    setTimeout(() => {
        ctx.reply('Ready for Book 2? Transfer $12.79 to my Grey account and send the screenshot here! 📸');
    }, 5000);
});

bot.launch();
