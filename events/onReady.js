const onReady = async (client) => {
  // console.log(client);
  console.log(`Connecté en tant que ${client.user.tag}`);

  // const guild = client.guilds.cache.get('1017067798498906153');

  // if (guild.available) {
  //   const members = await guild.members.fetch();
  //   const newMembers = members.map((member) => {
  //     const {
  //       id,
  //       user: { username }
  //     } = member;
  //     const roles = member.roles.cache.map((role) => role.name);

  //     return { id, username, roles };
  //   });
  //   console.log(newMembers);
  // }

  client.user.setPresence({
    activities: [
      {
        name: 'être connecté'
      }
    ],
    status: 'dnd'
  });
};

module.exports = { onReady };
