const fs = require(`fs`);
const file = `strings.json`;

class Store {
  constructor(fileName) {
    this.filename = fileName;
  }

  _getFieldMaxValue(field, arr) {
    let maxValue = 0;

    if (arr.length) {
      maxValue = arr.reduce((max, obj) => {
        return (obj[field] > max) ? obj[field] : max;
      }, 0);
    }

    return maxValue;
  }

  get nextId() {
    if (!this._maxId) {
      const strings = this.fetchStrings();
      this._maxId = this._getFieldMaxValue(`id`, strings);
    }

    return ++this._maxId;
  }

  saveStrings (strings) {
    fs.writeFileSync(this.filename, JSON.stringify(strings));
  }

  getRandomStrings(quantity) {
    const strings = this.fetchStrings();

    const newArr = [];

    while (newArr.length < quantity) {
      const index = Math.floor(Math.random() * strings.length);
      newArr.push(strings[index]);
    }

    return newArr;
  }

  fetchStrings() {
    try {
      const strings = fs.readFileSync(this.filename);
      return JSON.parse(strings);
    } catch (e) {
      return [];
    }
  }

  getStringById(id) {
    const strings = this.fetchStrings();

    return strings.find((item) => {
      if (item.id === id) {
        return true;
      }
    });
  }

  removeString(id) {
    const strings = this.fetchStrings();

    return strings.find((string, index) => {
      if (string.id === id) {
         strings.splice(index, 1);
         this.saveStrings(strings);

         return true;
      }
    });
  }
}

module.exports = new Store(file);

