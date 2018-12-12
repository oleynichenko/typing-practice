const yargs = require('yargs');

const startWithCountDown = require('./util/countdown');
const addCommand = require(`./commands/add`);
const listCommand = require(`./commands/list`);
const removeCommand = require(`./commands/remove`);
const startCommand = require(`./commands/start`);

const argv = yargs
  .command(addCommand.name, addCommand.description, addCommand.options)
  .command(listCommand.name, listCommand.description)
  .command(removeCommand.name, removeCommand.description, removeCommand.options)
  .command(startCommand.name, startCommand.description, startCommand.options)
  .help()
  .alias('help', 'h')
  .argv;

const command = argv._[0];

switch(command) {
  case addCommand.name:
    addCommand.execute(argv.string);
    break;

  case listCommand.name:
    listCommand.execute();
    break;

  case removeCommand.name:
    removeCommand.execute(argv.id);
    break;

  case startCommand.name:
    startWithCountDown(3, argv.quantity, startCommand.execute);
    break;
}
