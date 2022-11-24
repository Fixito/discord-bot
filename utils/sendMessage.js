const sendMessage = (message, sentence, members = []) => {
  message.channel
    .send(`${sentence} ${members.map((member) => `<@${member.id}>`).join(' ')}`)
    .catch((err) => console.log(err));
};

module.exports = { sendMessage };
