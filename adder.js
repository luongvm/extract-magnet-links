const UTorrent = require('library-utorrent');
const fs = require('fs');
const os = require('os');

const defaultOpts = {
  host: 'localhost',
  port: 45454,
  username: 'admin',
  password: '111111',
  downloadDir: 0,
  // path: '/dir/path/',
};
const adder = (options) => {
  const addTorrentByUrl = urlOrMagnet => new Promise((rs, rj) => {
    const opts = Object.assign(defaultOpts, options, {
      torrentUrl: urlOrMagnet,
    });
    UTorrent.addTorrentUrl(opts).exec({
    // An unexpected error occurred.
      error(err) {
        //no need to handle error!
        rs();
      },
      // OK.
      success() {
        rs();
      },
    });
  });
  return (magnetListPath) => {
    try { 
      const data = fs.readFileSync(magnetListPath, 'utf8');
      console.log('Reading magnet list file');
      const lines = data.split(os.EOL);
      const promises = [];
      (lines).forEach((element) => {
        if (element) {
          promises.push(addTorrentByUrl(element));
        }
      });
      Promise.all(promises).then((c) => {
        console.log('Done adding magnets to uTorrent');
      });
    } catch (err) {
      console.log(err);
      console.log('Unable to read file');
    }
  };
};
module.exports = adder;
