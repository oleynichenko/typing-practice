const store = require(`../stores/strings-store`);

module.exports = {
  name: `add`,
  description: `Add a new string`,
  options: {
    string: {
      describe: 'Text of string',
      demand: true,
      alias: 's'
    }
  },
  execute(string) {
    const formattedString = string.trim();
    const strings = store.fetchStrings();

    const isStringDuplicated = strings.find((item) => item.text === formattedString);

    if (isStringDuplicated) {
      console.log(`String already exists`);
    } else {
      strings.push({
        id: store.nextId,
        text: formattedString
      });

      store.saveStrings(strings);

      console.log(`String "${formattedString}" successfully saved.` )
    }
  }
};
