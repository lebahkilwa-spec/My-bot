const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// 1. رسالة الترحيب
bot.start((ctx) => {
    const welcomeMsg = `
🌟 **Welcome to Fenntel** 🌟
"Your sanctuary of coffee, melodies, and great reads."

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

// 2. إرسال الكتاب المجاني
bot.action('send_free', (ctx) => {
    ctx.reply('Preparing your gift... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch(err => ctx.reply('File not found.'));
});

// 3. صفحة المنتج (النص التسويقي البارع + الصورة)
bot.action('buy_premium', async (ctx) => {
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

    try {
        // يحاول إرسال الصورة مع النص التسويقي
        await ctx.replyWithPhoto({ source: 'preview.jpg' }, {
            caption: marketingText,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }],
                    [{ text: "⬅️ Back to Menu", callback_data: "start_over" }]
                ]
            }
        });
    } catch (error) {
        // إذا لم يجد الصورة، يرسل النص فقط لضمان عمل البوت
        ctx.reply(marketingText, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }],
                    [{ text: "⬅️ Back", callback_data: "start_over" }]
                ]
            }
        });
    }
});

// 4. تفاصيل الدفع
bot.action('show_payment', (ctx) => {
    const paymentMsg = `
🏦 **Payment Details (International Transfer)**

To receive your Premium copy, please complete the transfer:

💳 **IBAN (Grey Account):**
\`GB64CLJU04130741739018\`

📸 **Next Step:**
Send a screenshot of your receipt to @Mohamedlebah. Your book will be delivered to you personally upon verification. 📥
    `;
    ctx.reply(paymentMsg, { parse_mode: 'Markdown' });
});

// 5. العودة للبداية
bot.action('start_over', async (ctx) => {
    await ctx.deleteMessage();
    ctx.reply("🌟 Choose an option:");
});

bot.launch();
