const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

// واجهة المتجر الرئيسية
bot.start((ctx) => {
    const welcomeMsg = `
🌟 **Welcome to Fenntale Store** 🌟
Your journey to self-improvement starts here.

مرحباً بك في متجر **Fenntale**
هنا تجد أفضل الكتب الرقمية لتطوير الذات وعلم النفس.

👇 **Please choose an option | من فضلك اختر من الأسفل**
    `;

    ctx.reply(welcomeMsg, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: "Download FREE Book 📖 (one.book)", callback_data: "send_b1" }],
                [{ text: "Buy Premium Book 💎 (two.book)", callback_data: "buy_b2" }],
                [{ text: "Contact Support 📞 الدعم الفني", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

// إرسال الكتاب المجاني
bot.action('send_b1', (ctx) => {
    ctx.reply('Preparing your free gift... 🎁');
    // الكود الآن يبحث عن الاسم "one.book.pdf" بالضبط كما في صورتك
    ctx.replyWithDocument({ source: 'one.book.pdf' }).catch((err) => {
        ctx.reply('File "one.book.pdf" not found on server. Please contact support.');
    });
});

// معلومات شراء الكتاب الثاني
bot.action('buy_b2', (ctx) => {
    const paymentInfo = `
💳 **Payment Method | طريقة الدفع**

To get the full premium version (two.book), please transfer **$12.79** to:
للحصول على النسخة الكاملة، يرجى تحويل مبلغ **12.79$** إلى:

🏦 **Grey Account (IBAN):**
\`GB64CLJU04130741739018\`

⚠️ **Important | هام:**
After payment, send a **screenshot** of the receipt to @Mohamedlebah to receive your book.
بعد الدفع، أرسل **صورة التحويل** إلى الدعم الفني لاستلام كتابك.
    `;
    ctx.reply(paymentInfo, { parse_mode: 'Markdown' });
});

bot.launch();
