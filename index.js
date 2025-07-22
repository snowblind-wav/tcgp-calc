require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const BOT_PREFIX = "!tcgp";
const SALES_TAX_RATE = 0.075;
const MARKETPLACE_COMMISSION_RATE = 0.1025;
const PROCESSING_FEE_RATE = 0.025;
const PROCESSING_FEE_FIXED = 0.3;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.content.startsWith(BOT_PREFIX)) return;

  const args = message.content.slice(BOT_PREFIX.length).trim().split(/ +/);
  const itemPriceStr = args.shift();

  if (!itemPriceStr) {
    message.reply("Please provide an item price. Usage: `!tcgp <price>`");
    return;
  }

  const itemPrice = parseFloat(itemPriceStr);

  if (isNaN(itemPrice)) {
    message.reply("Invalid item price. Please provide a valid number.");
    return;
  }

  if (isNaN(itemPrice) || itemPrice <= 0) {
    message.reply("Item price must be a positive number.");
    return;
  }

  const salesTax = itemPrice * SALES_TAX_RATE;
  const orderTotal = itemPrice + salesTax;

  const calculatedCommission = itemPrice * MARKETPLACE_COMMISSION_RATE;
  const marketplaceCommission = Math.min(calculatedCommission, 50);

  const processingFee = orderTotal * PROCESSING_FEE_RATE + PROCESSING_FEE_FIXED;

  const totalFees = marketplaceCommission + processingFee;
  const sellerPayout = itemPrice - totalFees;

  const replyMessage = `**Total Fees:** $${totalFees.toFixed(2)}
**Payout:** $${sellerPayout.toFixed(2)}`;
  message.reply(replyMessage);
});

client.login(process.env.DISCORD_TOKEN);
