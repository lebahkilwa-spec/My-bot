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
                [{ text: "Download FREE Book 📖 (E-book 1)", callback_data: "send_b1" }],
                [{ text: "Buy Premium Book 💎 (E-book 2)", callback_data: "buy_b2" }],
                [{ text: "Contact Support 📞 الدعم الفني", url: "https://t.me/Mohamedlebah" }]
            ]
        }
    });
});

// التعامل مع زر الكتاب المجاني
bot.action('send_b1', (ctx) => {
    ctx.reply('Preparing your free gift... 🎁');
    // ملاحظة: تأكد من رفع ملف باسم B1_PREMIUM_FINAL.pdf على جيت هاب
    ctx.replyWithDocument({ source: './B1_PREMIUM_FINAL.pdf' }).catch((err) => {
        ctx.reply('The free book is being updated. Please contact support if it takes too long.');
    });
});

// التعامل مع زر الشراء
bot.action('buy_b2', (ctx) => {
    const paymentInfo = `
💳 **Payment Method | طريقة الدفع**

To get the full premium version, please transfer **$12.79** to the following account:
للحصول على النسخة الكاملة، يرجى تحويل مبلغ **12.79$** إلى الحساب التالي:

🏦 **Grey Account (IBAN):**
\`GB64CLJU04130741739018\`

⚠️ **Important | هام:**
After payment, please send a **screenshot** of the receipt to our support chat to receive your book.
بعد الدفع، يرجى إرسال **صورة التحويل** إلى الدعم الفني لاستلام كتابك.
    `;
    ctx.reply(paymentInfo, { parse_mode: 'Markdown' });
});

bot.launch();
