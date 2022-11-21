const addSpecificRoleToUser = (reaction, user, roleName) => {
  const roleToAdd = reaction.message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === roleName
  );
  const member = reaction.message.guild.members.cache.find(
    (member) => member.id === user.id
  );
  member.roles.add(roleToAdd);
};

module.exports = addSpecificRoleToUser;
