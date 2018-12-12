const store = require(`../stores/strings-store`);

module.exports = {
  name: `list`,
  description: `List all strings`,
  execute() {
    const strings = store.fetchStrings();

    if (strings.length) {
      strings.forEach((item) => {
        const bestTime = (item.time) ? `, time: ${item.time}` : ``;

        console.log(`Id: ${item.id}, "${item.text}"${bestTime};`);
      });
    } else {
      console.log(`Пока еще нет сохраненных строк для тренировок` )
    }
  }
};

