module.exports.getClosest = (data, now) => {
  let futureBdays = [];

  for (bdayObj of data) {
    if (bdayObj.birthdate - now > 0) {
      futureBdays.push(bdayObj);
    }
  }

  const closestBdayObj = futureBdays.sort(
    (a, b) => a.birthdate - b.birthdate
  )[0];

  return closestBdayObj;
};

module.exports.getCountdown = (birthdate) => {
  // Time as normal people know it
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Converting our gap to normal units not ms
  // const textMonth = Math.floor(birthdate / day);
  // const textHour = Math.floor((birthdate % day) / hour);
  // const textMinute = Math.floor((birthdate % hour) / minute);
  // const textSecond = Math.floor((birthdate % minute) / second);
  const textDay = Math.floor(birthdate / day);

  return textDay;
};

module.exports.isBdayToday = (client) => {
  const now = new Date();
  const bdaysData = [
    {
      name: "Pattu",
      birthdate: new Date(`November 22, ${now.getFullYear()} 00:00:00`),
      birthyear: 2004,
    },
    {
      name: "Shan",
      birthdate: new Date(`October 25, ${now.getFullYear()} 00:00:00`),
      birthyear: 2004,
    },
    {
      name: "Sem",
      birthdate: new Date(`March 17, ${now.getFullYear()} 00:00:00`),
      birthyear: 2005,
    },
    {
      name: "Ishrat",
      birthdate: new Date(`November 18, ${now.getFullYear()} 00:00:00`),
      birthyear: 2004,
    },
    {
      name: "Chakku",
      birthdate: new Date(`February 21, ${now.getFullYear()} 00:00:00`),
      birthyear: 2005,
    },
    {
      name: "Neesh",
      birthdate: new Date(`June 18, ${now.getFullYear()} 00:00:00`),
      birthyear: 2004,
    },
  ];

  for (bdayObj of bdaysData) {
    if (now.setHours(0, 0, 0, 0) === bdayObj.birthdate.setHours(0, 0, 0, 0)) {
      const age = now.getFullYear() - bdayObj.birthyear;

      client.user.setActivity(`${bdayObj.name} turn ${age} 🎉🥳`, {
        type: "WATCHING",
      });

      targetChannel = client.channels.cache.get("820367714815180800");
      targetChannel.send(`Happy Birthday ${bdayObj.name} 🎉 🥳 !`);

      return;
    }
  }
};

module.exports.works = (message) => {
  message.channel.send("Exported function worked");
};
