require("dotenv").config();

const {
  Client,
  GatewayIntentBits
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, ],
});

const BOT_PREFIX = "!tcgp";
const SALES_TAX_RATE = 0.075;
const MARKETPLACE_COMMISSION_RATE = 0.1025;
const PROCESSING_FEE_RATE = 0.025;
const PROCESSING_FEE_FIXED = 0.3;

client.on("ready", () = >{
  console.log(`$ {
    client.user.tag
  } is ready! `);
});

client.on("messageCreate", (message) = >{
  if (message.author.bot || !message.content.startsWith(BOT_PREFIX)) return;

  const itemPriceStr = message.content.slice(BOT_PREFIX.length).trim().split(/\s+/)[0];

  if (!itemPriceStr) {
    message.reply("Please provide an item price. Usage: `!tcgp <price>`");
    return;
  }

  const itemPrice = parseFloat(itemPriceStr ? .replace(/[$,]/g, "") || "");

  if (!itemPrice || itemPrice <= 0) {
    message.reply("Invalid price. Please provide a valid positive number.");
    return;
  }
  const salesTax = itemPrice * SALES_TAX_RATE;
  const orderTotal = itemPrice + salesTax;

  const calculatedCommission = itemPrice * MARKETPLACE_COMMISSION_RATE;
  const marketplaceCommission = Math.min(calculatedCommission, 50);

  const processingFee = orderTotal * PROCESSING_FEE_RATE + PROCESSING_FEE_FIXED;

  const totalFees = marketplaceCommission + processingFee;
  const sellerPayout = itemPrice - totalFees;

  const replyMessage = ` * *Total Fees: **$$ {
    totalFees.toFixed(2)
  } * *Payout: **$$ {
    sellerPayout.toFixed(2)
  } - # * Assumes 1 item * `;

  message.reply(replyMessage);
});

client.login(process.env.DISCORD_TOKEN);
