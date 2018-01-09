## Extract torrent magnet links from website
I don't really want to click 12 magnet links to download all episodes of an anime season so this is the tool.
### How To Use

1. Clone the repo.
2. Install the deps with `npm i` or `yarn`.
3. If you want automatically found links add to uTorrent, open `index.js` and config the WebUI credentials. (Your uTorrent client need to enable WebUI). Ignore this step if you do not want automatically add.
4. Run the code: `node index.js` or `node index.js --add` if you want to automatically add. Need to have uTorrent running.
5. The script with prompt you to pate the website links. Copy and paste the url of the website where the links are.
6. Output magnet links is stored in `result-*.txt`.

### Notes
I only designed it to use with `nyaa.**` and used regex to find the magnet links, so if other page doesn't work please open an issue and I will look into it.

### Contributing
Feel free to fork and create pull requests.