const commands = {
  category1: [
    { name: "sth", description: "desc" },
    { name: "sth", description: "desc" },
    { name: "sth", description: "desc" },
  ],
  category2: [
    { name: "sth", description: "desc" },
    { name: "sth", description: "desc" },
    { name: "sth", description: "desc" },
  ],
}

for (const category in commands) {
  console.log(category)
}
