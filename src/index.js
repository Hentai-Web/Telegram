const TelegramBot = require("node-telegram-bot-api");
const hmtai = require("./hmtai");
const fetch = require("sync-fetch");
require("dotenv").config();

const h = hmtai;
const token = process.env.BOT_TOKEN;

const help_message = `
All commands

Also works with:
/sfw_<sfwTag>
/nsfw_<nsfwTag>

SFW:
- wallpaper
- mobileWallpaper
- neko
- jahy
- slap
- lick
- depression
- christmas
- legs

NSFW:
- ass
- bdsm
- cum
- creampie
- manga
- femdom
- hentai
- incest
- ero
- orgy
- elves
- pantsu
- cuckold
- blowjob
- boobjob
- foot
- vagina
- ahegao
- uniform
- gangbang
- gif
- nsfwNeko
- glasses
- tentacles
- thighs
- yuri
- zettaiRyouiki
- nsfwChristmas
- nsfwMobileWallpaper
- publicmasturbation
`;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

function sendHWImg(regex, codeName) {
  bot.onText(regex, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    const res = fetch(
      `https://cdn.dergoogler.com/others/hentai-web/images/${resp}.json`
    );
    const img = res.json();

    try {
      bot.sendPhoto(chatId, codeName(resp, img), { caption: null });
    } catch (error) {
      bot.sendMessage(error);
    }
  });
}

sendHWImg(/\/(.+)/, (resp, img) => {
  return img[Math.floor(Math.random() * img.length)];
});

sendHWImg(/(.+)/, (resp, img) => {
  return img[Math.floor(Math.random() * img.length)];
});

bot.onText(/(\/?)commmands/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  try {
    bot.sendMessage(chatId, help_message);
  } catch (error) {
    console.log(error);
  }
});
