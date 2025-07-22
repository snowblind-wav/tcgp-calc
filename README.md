# TCGP-Calc
![JavaScript](https://img.shields.io/badge/language-JavaScript-blue?&logo=javascript)
![Node.js](https://img.shields.io/badge/node-24.x-red?&logo=node.js)
![discord.js](https://img.shields.io/npm/v/discord.js.svg?color=7289DA&logo=discord)
![dotenv](https://img.shields.io/npm/v/dotenv.svg?color=orange&logo=.env)


Simple Discord bot that calculates total fees and seller payout for an item price. Send a command in your server channel, and the bot will reply with the fee breakdown.

---



## Installation

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/snowblind-wav/tcgp-calc.git
    cd tcgp-calc
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create your environment file:
    ```bash
    cp .env.example .env
    ```

4. Paste your Discord bot token in the `.env` file
    ```env
    DISCORD_TOKEN=your_discord_bot_token_here
    ```

---

## Configuration

The bot reads configuration from environment variables:
- `DISCORD_TOKEN` - Your Discord applicaiton's bot token

---

## Usage

Start the bot with:
```bash
node index.js
```

---

## Running with PM2

To keep your bot running in the background and restart on crashes, use [PM2](https://pm2.keymetrics.io/);

1. Install PM2 globally
    ```bash
    npm install -g pm2
    ```

2. Start the bot under PM2's process manager:
    ```bash
    pm2 start index.js --name tcgp-calc
    ```

3. Save the PM2 process list
    ```bash
    pm2 save
    ```

4. View logs or monitor the process:
    ```bash
    pm2 log tcgp-calc
    pm2 status
    ```

---

## Commands

- `!tcgp <price>`
    Calculates fees based on the provided price.
    - `<price>` must be a positive number

---

## License

This project is licensed under the [MIT License](LICENSE). 