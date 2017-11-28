/* globals DatArchive */
const CHANNEL_JSON_PATH = './';
const CHANNEL_FILENAME = 'channel.json';

export default class Channel {
  constructor(archiveURL) {
    this.archive = new DatArchive(archiveURL);
    this.channelPath = `${CHANNEL_JSON_PATH}/${CHANNEL_FILENAME}`;
  }

  userHasChannel() {
    return this.archive.stat(this.channelPath)
    .then(file => {
      if (file.isFile()) {
        //parse and return it
        return this.archive.readFile(this.channelPath)
          .then(file => {
            try {
              return JSON.parse(file);
            } catch (err) {
              throw new Error(err);
            }
          });
      }
    })
    .catch(err => null);
  }

  getInfo() {}
}

