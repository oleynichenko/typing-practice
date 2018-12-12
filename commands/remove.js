const store = require(`../stores/strings-store`);

module.exports = {
  name: `remove`,
  description: `Remove a string by id`,
  options: {
    id: {
      describe: `String's id`,
      demand: true,
      alias: `i`
    }
  },
  execute(idStr) {
    const id = +idStr;
    const removedString = store.removeString(id);

    if (removedString) {
      console.log(`String with id=${id} ("${removedString.text}") removed`);
    } else {
      console.log(`String with id=${id} does not exist!`);
    }
  }
};

