const readline = require('readline');
const validUrl = require('valid-url');
const os = require('os');

const promptForLink = () => new Promise((rs, rj) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    `Please insert nyaa.si link from the page you want to extract magnet urls:${
      os.EOL}`,
    (answer) => {
      if (answer == 'q') {
        rs({ code: -2 });
      } else if (validUrl.isUri(answer) != undefined) {
        rs({ code: 0, url: answer });
      } else {
        console.log('Sorry that\'s not a link, try again.');
        rs({ code: -1 });
      }
      rl.close();
    },
  );
});

module.exports = promptForLink;
