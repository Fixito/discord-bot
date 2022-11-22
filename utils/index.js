const { getMembersToMention } = require('./getMembersToMention');
const { sendMessage } = require('./sendMessage');
const { sendDoc } = require('./sendDoc');
const toggleRole = require('./toggleRole');

module.exports = {
  getMembersToMention,
  sendMessage,
  sendDoc,
  toggleRole
};
