const { Telegraf } = require('telegraf');
const http = require('http');
const bot = new Telegraf(process.env.BOT_TOKEN);

// السيرفر الوهمي لضمان استمرار الخدمة على Render
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Fenntel Bot is Live");
});
server.listen(process.env.PORT || 3000);

bot.start((ctx) => {
    // إعادة الجملة الخاصة بك كما طلبت تماماً
    ctx.reply(`🌟 **مرحبا بك في fenntale حيث القهوة والموسيقى والكتاب** 🌟`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📖 Get FREE Book (One)", callback_data: "send_free" }],
                [{ text: "💎 UNBEATABLE MIND (Premium)", callback_data: "show_premium_info" }],
                [{ text: "📞 Contact Support", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

bot.action('send_free', (ctx) => {
    ctx.reply('Preparing your gift... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch(err => {
        ctx.reply('الملف قيد التجهيز، يرجى المحاولة مرة أخرى بعد قليل.');
    });
});

bot.action('show_premium_info', (ctx) => {
    const marketingText = `
🏆 **UNBEATABLE MIND: The Masterclass** 🏆

Are you ready to transcend your limits? 🚀

This isn't just a book; it's a **Transformation Blueprint**. After the success of our first edition, we dive deeper into the mechanics of the human psyche to help you build a mind that stands firm against any chaos.

✨ **Inside this Premium Edition:**
• **The Stoic Core:** Mastering emotional resilience.
• **Neural Rewiring:** Breaking the chains of old habits.
• **Elite Performance:** Psychological tools used by the top 1%.

"Your mind is your greatest asset. Invest in it wisely." ☕️📚

💰 **Price: $12.79**
    `;

    ctx.reply(marketingText, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }],
                [{ text: "⬅️ Back", callback_data: "start_over" }]
            ]
        }
    });
});

bot.action('show_payment', (ctx) => {
    ctx.reply(`🏦 **Payment Details**\n\nTransfer **$12.79** to:\n\`GB64CLJU04130741739018\`\n\n⚠️ Send the screenshot to @Mohamedlebah`, { parse_mode: 'Markdown' });
});

bot.action('start_over', (ctx) => {
    // العودة مع نفس الجملة الأصلية
    ctx.editMessageText(`🌟 **مرحبا بك في fenntale حيث القهوة والموسيقى والكتاب** 🌟`, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "📖 Get FREE Book (One)", callback_data: "send_free" }],
                [{ text: "💎 UNBEATABLE MIND (Premium)", callback_data: "show_premium_info" }],
                [{ text: "📞 Contact Support", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

bot.launch();
