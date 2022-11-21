const removeSpecificRoleToUser = (reaction, user, roleName) => {
  const roleToRemove = reaction.message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === roleName
  );
  const member = reaction.message.guild.members.cache.find(
    (member) => member.id === user.id
  );
  member.roles.remove(roleToRemove);
};

module.exports = removeSpecificRoleToUser;
