const { Markup } = require('telegraf');
const texts = require('./texts');

function ensureSession(ctx) {
  if (!ctx.session) ctx.session = {};
}

const mainMenu = Markup.inlineKeyboard([
  [Markup.button.callback('💰 Deposit Problem', 'deposit')],
  [Markup.button.callback('💸 Withdraw Problem', 'withdraw')],
  [Markup.button.callback('🎮 Game Problem', 'game')],
  [Markup.button.callback('🎁 Bonus', 'bonus')],
  [Markup.button.callback('📢 Channel', 'channel')],
]);

function setupHandlers(bot) {

  bot.start((ctx) => {
    ctx.session = {};
    ctx.reply(texts.WELCOME, mainMenu);
  });

  bot.action('deposit', (ctx) => {
    ensureSession(ctx);
    if (ctx.session.active) return ctx.answerCbQuery('Active request running');
    ctx.session.tag = 'DEPOSIT';
    ctx.editMessageText(texts.DEPOSIT);
  });

  bot.action('withdraw', (ctx) => {
    ensureSession(ctx);
    if (ctx.session.active) return ctx.answerCbQuery('Active request running');
    ctx.session.tag = 'WITHDRAW';
    ctx.editMessageText(texts.WITHDRAW);
  });

  bot.action('game', (ctx) => {
    ensureSession(ctx);
    if (ctx.session.active) return ctx.answerCbQuery('Active request running');
    ctx.session.tag = 'GAME';
    ctx.editMessageText(texts.GAME);
  });

  bot.action('bonus', (ctx) => {
    ctx.editMessageText(texts.BONUS);
  });

  bot.action('channel', (ctx) => {
    ctx.editMessageText(texts.CHANNEL);
  });

}

module.exports = setupHandlers;