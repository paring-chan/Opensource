const os = require("os");
module.exports.run = async (bot, message, args) => {
  message.channel.send(
    `\`\`\`SERVER INFO-->\nCPU INFO -->\nCPU MODEL = ${os.cpus[0].model}\nCPU CLOCK SPEED = ${os.cpus[0].speed} MHz\nCPU IDLE TIME = ${os.cpus[0].idle} ms\n----------------------------------------\nMEMORY INFO -->\nTOTAL MEMORY = ${os.totalmem} MB\nFREE MEMORY = ${os.freemem} MB\`\`\``
  );
};
exports.config = {
  name: "시스템정보",
  aliases: ["봇상태", "status"],
  category: ["ADMIN"],
  des: ["봇상태에 대한 설명"],
  use: ["ㄲ 시스템정보"]
};
