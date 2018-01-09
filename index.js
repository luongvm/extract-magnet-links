const promptForLink = require('./prompter');
// insert your utorrent webUI credentials here so it can connect and add;
const extract = require('./extractor');
const adder = require('./adder')({
  username: 'admin',
  password: '123456',
  host: 'localhost',
  port: 45454,
});

let addToUTorrent = false;
const args = process.argv.slice(2);
if (args && args.length > 0) {
  if (args[0] == '--add') {
    addToUTorrent = true;
  }
}

const main = async () => {
  let result = { code: -2 };
  while (result.code != 0) {
    result = await promptForLink();
  }
  if (result.code != -2) {
    const finished = await extract(result.url);
    if (finished) {
      if (addToUTorrent) {
        await adder(finished);
      } else{
        console.log('Done!');
      }
    }
  }
  return true;
};

main();
