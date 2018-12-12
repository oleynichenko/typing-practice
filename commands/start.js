const readline = require(`readline`);
const store = require(`../stores/strings-store`);

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

    const setAnswerTime = (string, time) => {
      string.newTime = new Date().getTime() - time;
    };

    const getResult = (strings) => {
      let previousResultTime = 0;
      let challengeResultTime = 0;
      const betterTimeStrings = [];

      strings.forEach((string) => {
        if (string.time) {
          previousResultTime = previousResultTime + string.time;
          challengeResultTime = challengeResultTime + string.newTime;

          if (string.newTime < string.time) {
            betterTimeStrings.push(string);
          }
        } else {
          betterTimeStrings.push(string);
        }
      });

      if (betterTimeStrings.length) {
        store.updateTime(betterTimeStrings);
      }

      return (previousResultTime === 0)
        ? 0
        : (previousResultTime - challengeResultTime) / previousResultTime * 100;
    };

    const getResultMessage = (result) => {
      if (result === 0) {
        return `Новые слова. Сравнение будет в следующих задачах.`
      } else {
        const roundedResult = Math.round(result * 10) / 10;

        return (roundedResult > 0)
          ? `Новый рекорд! +${roundedResult}%`
          : `Прогресс отсутствует.. ${roundedResult}%`;
      }
    };

    const askQuestion = (text) => {
      const question = `${text}\n`;
      const startTime = new Date().getTime();

      rl.question(question, (answer) => {
        if (answer === text) {
          setAnswerTime(challengeStrings[counter], startTime);

          if (counter === q - 1) {
            const result = getResult(challengeStrings);
            const resultMessage = getResultMessage(result);

            console.log(resultMessage);
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

