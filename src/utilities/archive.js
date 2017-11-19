/* globals DatArchive window */

const DEFAULT_FILE_OPTS = {
  recursive: true
};

export default class Archive {
  constructor(url = window.location.host) {
    this.archive = new DatArchive(url);
  }

  /**
   * 
   */
  createDir(directory) {
    this.hasDir(directory)
      .then(dir => {
        if (!dir) {
          this.archive.mkdir(directory);
        }
      })
      .catch(e => {
        //handle err
      });
  }

  hasDir(path) {
    //TODO - this is probably weak logic
    return this.archive.stat(path)
      .then(path => path.isDirectory())
      .catch(err => console.log("HAS DIR ERR", err));
  }

  saveFile(path, name, data) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(data);

      reader.addEventListener('loadend', ({srcElement: { result }}) => {
        this.archive.writeFile(`${path}/${name}.ogg`, result).then(() => {
          this.archive.commit();
          resolve();
        }, reject);
      });
    });
  }

  getFiles(directory, opts = DEFAULT_FILE_OPTS) {
    return this.archive.readdir(directory, opts);
  }

  deleteFile(path, fileName) {
    return this.archive.unlink(`${path}/${fileName}`).then(() => {
      this.archive.commit();
    });
  }
}
