const { Telegraf } = require('telegraf');
const http = require('http'); 
const bot = new Telegraf(process.env.BOT_TOKEN);

// --- Dummy server to keep the bot alive on Render Free Tier ---
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Fenntale Bot is Active");
});
server.listen(process.env.PORT || 3000);

bot.start((ctx) => {
    const welcomeMsg = `
🌟 **Welcome to Fenntale** 🌟
"Fenntale: Your sanctuary of coffee, melodies, and great reads."

Explore our collection of digital books designed to inspire your journey.

👇 **Please choose an option:**
    `;

    ctx.reply(welcomeMsg, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📖 Download FREE Book (One)", callback_data: "send_free" }],
                [{ text: "💎 Buy Premium Book (Two)", callback_data: "buy_premium" }],
                [{ text: "📞 Contact Support", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

bot.action('send_free', (ctx) => {
    ctx.reply('Preparing your gift... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch((err) => {
        ctx.reply('Error: File not found.');
    });
});

bot.action('buy_premium', (ctx) => {
    const paymentMsg = `
💳 **Payment Details**

To get your copy of **"Two Book"**, please transfer **$12.79** to:

🏦 **Grey Account (IBAN):**
\`GB64CLJU04130741739018\`

⚠️ **Important:**
After payment, please send a **screenshot** of the receipt to @Mohamedlebah to receive your book instantly.
    `;
    ctx.reply(paymentMsg, { parse_mode: 'Markdown' });
});

bot.launch();
