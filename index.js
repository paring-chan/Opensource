const Discord = require("discord.js");
const client = new Discord.Client();
const Eco = require("quick.eco");
const db = require("quick.db");
const reload = require("self-reload-json")
const fs = require('fs')
const config = require("./config.json")


client.once("ready", () => {
  console.log("봇작동중...");
  client.user
    .setActivity(`${prefix} 도움말 확인`, { type: "PLAYING" })
    .then(presence =>
      console.log(
        `Activity set to ${presence.game ? presence.game.name : "none"}`
      )
    )
});


client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.devs = ['유저 아이디', "1234567890"]//유저 아이디에 자신의 아이디를 넣으세요
client.category = ['ADMIN', 'MODERATOR', 'INFO']
fs.readdirSync("./command/").forEach(dir => {
    const Filter = fs.readdirSync(`./command/${dir}`).filter(f => f.endsWith(".js"));
    Filter.forEach(file => {
        const cmd = require(`./command/${dir}/${file}`);
        client.commands.set(cmd.config.name, cmd)
        for (let alias of cmd.config.aliases) {
            client.aliases.set(alias, cmd.config.name)
        }
    })
})


function runCommand(command, msg, args, prefix) {
    if (client.commands.get(command) || client.aliases.get(command)) {
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
        if (cmd) cmd.run(client, msg, args, prefix);
        return
    }
}
client.on("message", async msg => {
    const prefix = "접두사" // 접두사 에 자기 봇 접두사 적으세요
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    let args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    try {
        runCommand(command, msg, args, prefix)
    } catch (e) {
        console.error(e)
    }

})

client.login(config.token)
