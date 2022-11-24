const { poll } = require('discord.js-poll');

module.exports = {
  name: 'poll',
  description: 'Create a poll',
  usage: 'Title + Option 1 + Option 2 + Option 3 + etc',
  execute(_, message, args) {
    poll(message, args, '+', '#00D1CD');
  }
};
