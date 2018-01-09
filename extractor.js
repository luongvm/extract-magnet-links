const axios = require('axios');
const os = require('os');
const fs = require('fs');

const extractMagnetFromUrl = inputUrl => new Promise(async (rs, rj) => {
  try {
    console.log('Downloading data');
    const data = await axios.get(inputUrl);

    if (!data) {
      rj(false);
    }
    console.log('Extracting data');
    const regex = /"(magnet:\?xt=urn:btih:\S+)"/gi;
    const str = data.data;
    let m;
    const outFilePath = `./result-${Math.floor(Date.now() / 1000)}.txt`;
    let outputString = '';
    while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      //   m.forEach((match, groupIndex) => {
      outputString += `${m[1]}${os.EOL}`;
    //   });
    }

    fs.writeFile(outFilePath, outputString, (err) => {
      if (err) {
        rj(err);
      }
      console.log(`Links written to file: ${outFilePath}`);
      rs(outFilePath);
    });
  } catch (err) {
    rj(err);
  }
});
module.exports = extractMagnetFromUrl;
