const readline = require(`readline`);
const store = require(`../store`);

module.exports = {
  name: `start`,
  description: `Start challenge`,
  options: {
    quantity: {
      alias: 'q',
      describe: `Quantity of strings in challenge`,
      default: 5
    }
  },
  execute(quantity) {
    const q = +quantity;
    const challengeStrings = store.getRandomStrings(q);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let counter = 0;

    const askQuestion = (text) => {
      const question = `${text}\n`;

      rl.question(question, (answer) => {
        if (answer === text) {
          console.log(true);

          if (counter === q - 1) {
            rl.close();
          } else {
            counter = counter + 1;
            askQuestion(challengeStrings[counter].text);
          }
        } else {
          console.log(false);
          askQuestion(challengeStrings[counter].text);
        }
      });
    };

    askQuestion(challengeStrings[counter].text);
  }
};

