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
                [{ text: "Contact Support 📞 الدعم الفني", url: "https://t.me/YOUR_USERNAME" }] // استبدل YOUR_USERNAME باسم حسابك الشخصي
            ]
        }
    });
});

// نظام التعامل مع الأزرار
bot.action('send_b1', (ctx) => {
    ctx.reply('Preparing your free gift... 🎁');
    // هنا سنرفع الملف لاحقاً
    ctx.reply('The file will be available here once uploaded to GitHub.');
});

bot.action('buy_b2', (ctx) => {
    ctx.reply(`
💳 **Payment Method | طريقة الدفع**

To get the full premium version, please transfer **$12.79** to:
للحصول على النسخة الكاملة، يرجى تحويل المبلغ إلى:

🏦 **Grey Account:** [حسابك هنا]
📸 **Send screenshot to support.**
    `);
});

bot.launch();
