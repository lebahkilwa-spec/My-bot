const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// رسالة الترحيب
bot.start((ctx) => {
    ctx.reply(`Welcome to Fenntale Store 🌟
مرحباً بك في متجر Fenntale

يمكنك الحصول على كتابك المجاني الآن، أو طلب النسخة الممتازة من كتابنا الثاني.`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Download FREE Book (One) 📖", callback_data: "send_free" }],
                [{ text: "Buy Premium Book (Two) 💎", callback_data: "buy_premium" }],
                [{ text: "Contact Support | الدعم الفني 📞", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

// إرسال الكتاب المجاني
bot.action('send_free', (ctx) => {
    ctx.reply('Sending your free book... 🎁');
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch((err) => {
        ctx.reply('Error: one.book.pdf not found.');
    });
});

// معلومات شراء الكتاب الثاني
bot.action('buy_premium', (ctx) => {
    const paymentMsg = `
💳 **Payment Details | تفاصيل الدفع**

للحصول على كتاب (Two book)، يرجى تحويل مبلغ **12.79$** إلى:

🏦 **Grey Account (IBAN):**
\`GB64CLJU04130741739018\`

⚠️ **بعد التحويل:**
يرجى إرسال صورة الوصل (Screenshot) إلى الحساب التالي لتفعيل الكتاب لك:
@Mohamedlebah
    `;
    ctx.reply(paymentMsg, { parse_mode: 'Markdown' });
});

bot.launch();
