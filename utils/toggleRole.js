const toggleRole = (reaction, user, roleName, action) => {
  const roleToAdd = reaction.message.guild.roles.cache.find(
    (role) => role.name.toLowerCase() === roleName
  );
  const member = reaction.message.guild.members.cache.find(
    (member) => member.id === user.id
  );

  if (action === 'add') {
    member.roles.add(roleToAdd);
  } else if (action === 'remove') {
    member.roles.remove(roleToAdd);
  } else {
    return;
  }
};

module.exports = toggleRole;
