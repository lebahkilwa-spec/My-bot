const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// Main Welcome Message (English Only)
bot.start((ctx) => {
    const welcomeMsg = `
🌟 **Welcome to Fenntale** 🌟
"Your sanctuary of coffee, melodies, and great reads."

Explore our collection of digital books designed to inspire your journey.

👇 **Please choose an option:**
    `;

    ctx.reply(welcomeMsg, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📖 Download FREE Book (one.book)", callback_data: "send_free" }],
                [{ text: "💎 Buy Premium Book (two.book)", callback_data: "buy_premium" }],
                [{ text: "📞 Contact Support", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

// Action for FREE Book
bot.action('send_free', (ctx) => {
    ctx.reply('Preparing your gift... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch((err) => {
        ctx.reply('Error: "one.book.pdf" not found on server.');
    });
});

// Action for Premium Book (Payment Info)
bot.action('buy_premium', (ctx) => {
    const paymentMsg = `
💳 **Payment Details**

To get your copy of **"two.book"**, please transfer **$12.79** to:

🏦 **Grey Account (IBAN):**
\`GB64CLJU04130741739018\`

⚠️ **Important:**
After payment, please send a **screenshot** of the receipt to @Mohamedlebah to receive your book instantly.
    `;
    ctx.reply(paymentMsg, { parse_mode: 'Markdown' });
});

bot.launch();
