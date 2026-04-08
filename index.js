const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// الروابط المباشرة للصور من GitHub الخام
const IMG_1 = "https://raw.githubusercontent.com/lebahkilwa-spec/roboti/main/preview1.jpg";
const IMG_2 = "https://raw.githubusercontent.com/lebahkilwa-spec/roboti/main/preview2.jpg";
const IMG_3 = "https://raw.githubusercontent.com/lebahkilwa-spec/roboti/main/preview3.jpg";

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

bot.action('buy_premium', async (ctx) => {
    const marketingText = `
🏆 **UNBEATABLE MIND: The Masterclass** 🏆

Are you ready to transcend your limits? 🚀

This isn't just a book; it's a **Transformation Blueprint**. We dive deep into the psyche to build a mind that stands firm against any chaos.

✨ **Inside this Premium Edition:**
• **The Stoic Core:** Mastering emotional resilience.
• **Neural Rewiring:** Breaking the chains of old habits.
• **Elite Performance:** Psychological tools used by the top 1%.

"Your mind is your greatest asset. Invest in it wisely." ☕️📚

💰 **Price: $12.79**
    `;

    try {
        // إرسال الصور كألبوم بروابط Raw مباشرة
        await ctx.replyWithMediaGroup([
            { type: 'photo', media: IMG_1 },
            { type: 'photo', media: IMG_2 },
            { type: 'photo', media: IMG_3, caption: marketingText, parse_mode: 'Markdown' }
        ]);

        await ctx.reply("✨ **Ready to start your journey?**", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "💳 Secure Your Copy Now", callback_data: "show_payment" }],
                    [{ text: "⬅️ Back", callback_data: "start_over" }]
                ]
            }
        });
    } catch (error) {
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
