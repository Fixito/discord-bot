const callMembersToPLay = async (members, roletoCall) => {
  const newMembers = members.map((member) => {
    const {
      id,
      user: { username }
    } = member;
    const roles = member.roles.cache.map((role) => role.name);

    return { id, username, roles };
  });

  const filteredMembers = newMembers.filter((member) =>
    member.roles.includes(roletoCall)
  );

  return filteredMembers;
};

module.exports = { callMembersToPLay };
