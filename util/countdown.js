module.exports = (time, arg, cb) => {
  setTimeout(function run() {
    if (time > 0) {
      process.stdout.write("  Get ready " + time + "\r");

      time--;
      setTimeout(run, 1000);
    } else {
      cb(arg);
    }
  }, 1000);
};
