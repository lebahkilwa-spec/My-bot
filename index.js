const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply('Welcome to Fenntale Store 🌟', {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Download FREE Book 📖", callback_data: "send_b1" }],
                [{ text: "Buy Premium Book 💎", callback_data: "buy_b2" }],
                [{ text: "Contact Support 📞", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

bot.action('send_b1', (ctx) => {
    ctx.reply('Preparing your book... 🎁');
    // هنا قمت بتحديث الاسم ليتطابق مع ما رفعته أنت في جيت هاب
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch((err) => {
        ctx.reply('Error: File one.book.pdf not found.');
    });
});

bot.action('buy_b2', (ctx) => {
    ctx.reply('Transfer $12.79 to IBAN:\nGB64CLJU04130741739018\n\nThen send screenshot to @Mohamedlebah');
});

bot.launch();
