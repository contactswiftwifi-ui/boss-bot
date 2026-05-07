const { DEPOSIT_ADMIN, WITHDRAW_ADMIN, GAME_ADMIN } = require('./config');
const { generateTicket } = require('./utils');

function setupSupport(bot) {

  bot.on('message', async (ctx) => {

    const user = ctx.from;

    if (!ctx.session) ctx.session = {};

    // LOCK SYSTEM
    if (ctx.session.active) {
      return ctx.reply('⛔ You already have an active request');
    }

    const tag = ctx.session.tag;
    if (!tag) return;

    const ticket = generateTicket();
    ctx.session.active = true;

    const msg = `🎫 ${ticket} | ${tag}

👤 ${user.first_name}
🆔 ${user.id}

💬 ${ctx.message.text || 'Media'}`;

    let admins = [];

    if (tag === 'DEPOSIT') admins = DEPOSIT_ADMIN;
    if (tag === 'WITHDRAW') admins = WITHDRAW_ADMIN;
    if (tag === 'GAME') admins = GAME_ADMIN;

    // SEND TO ADMINS
    admins.forEach(id => {
      bot.telegram.sendMessage(id, msg, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "⏳ Wait", callback_data: "wait" }],
            [{ text: "📌 Ask UID", callback_data: "ask_uid" }],
            [{ text: "✅ Solved", callback_data: "solve_" + user.id }]
          ]
        }
      });
    });

    ctx.reply('✅ Request received');

  });

  // QUICK REPLIES
  bot.action('wait', (ctx) => {
    ctx.reply('⏳ Please wait, checking...');
  });

  bot.action('ask_uid', (ctx) => {
    ctx.reply('📌 Please send your UID');
  });

  bot.action(/solve_(.+)/, (ctx) => {
    const userId = ctx.match[1];
    bot.telegram.sendMessage(userId, '✅ Your issue has been resolved');
    ctx.reply('Marked as solved');
  });

}

module.exports = setupSupport;