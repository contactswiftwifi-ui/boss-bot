const { Telegraf, session } = require('telegraf');

const setupHandlers = require('./handlers');
const setupSupport = require('./support');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());

setupHandlers(bot);
setupSupport(bot);

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

console.log("Bot running 🚀");