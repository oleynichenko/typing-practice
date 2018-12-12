const store = require(`../store`);

module.exports = {
  name: `list`,
  description: `List all strings`,
  execute() {
    const strings = store.fetchStrings();

    if (strings.length) {
      strings.forEach((item) => {
        const bestTime = (item.time) ? `, ${item.time}` : ``;

        console.log(`Id: ${item.id}, "${item.text}"${bestTime};`);
      });
    } else {
      console.log(`Пока еще нет сохраненных строк для тренировок` )
    }
  }
};

