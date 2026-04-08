const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(`🌟 **Welcome to Fenntel** 🌟\n"Your sanctuary of coffee, melodies, and great reads."`, {
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
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch(err => ctx.reply('File not found.'));
});

// --- عرض ألبوم الصور مع النص التسويقي ---
bot.action('buy_premium', async (ctx) => {
    const marketingText = `
🏆 **UNBEATABLE MIND: The Masterclass** 🏆

Are you ready to transcend your limits? 🚀

This isn't just a book; it's a **Transformation Blueprint**. We dive deep into the mechanics of the psyche to build a mind that stands firm against any chaos.

✨ **Inside this Premium Edition:**
• **The Stoic Core:** Mastering emotional resilience.
• **Neural Rewiring:** Breaking the chains of old habits.
• **Elite Performance:** Psychological tools used by the top 1%.

"Your mind is your greatest asset. Invest in it wisely." ☕️📚

💰 **Price: $12.79**
    `;

    try {
        // إرسال مجموعة صور (Album)
        await ctx.replyWithMediaGroup([
            { type: 'photo', media: { source: 'preview1.jpg' } },
            { type: 'photo', media: { source: 'preview2.jpg' } },
            { type: 'photo', media: { source: 'preview3.jpg' }, caption: marketingText, parse_mode: 'Markdown' }
        ]);

        // إرسال أزرار الدفع في رسالة منفصلة تحت الألبوم
        await ctx.reply("✨ **Ready to start your journey?**", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }],
                    [{ text: "⬅️ Back", callback_data: "start_over" }]
                ]
            }
        });

    } catch (error) {
        // في حال نقص أي صورة، يرسل النص فقط لضمان استمرار العمل
        ctx.reply(marketingText, {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }]
                ]
            }
        });
    }
});

bot.action('show_payment', (ctx) => {
    ctx.reply(`🏦 **Payment Details**\n\nTransfer **$12.79** to:\n\`GB64CLJU04130741739018\`\n\n⚠️ Send the screenshot to @Mohamedlebah`, { parse_mode: 'Markdown' });
});

bot.action('start_over', (ctx) => {
    ctx.reply("🌟 Choose an option:");
});

bot.launch();
