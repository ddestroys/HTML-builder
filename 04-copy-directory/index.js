const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

const dirRemoveOptions = {
  recursive: true,
  force: true
};

const dirCreateOptions = {
  recursive: true
};

function copyDir(initDir, tarDir) {
  fsPromises.rm(tarDir, dirRemoveOptions)
    .then(() => {
      fsPromises.mkdir(tarDir, dirCreateOptions)
        .catch(error => {if (error) throw error;});

      fsPromises.readdir(initDir)
        .then(files => {
          files.forEach(file => {
            try {
              fs.stat(path.join(initDir, file), (err, stats) => {
                if (stats.isDirectory()) {
                  copyDir(path.join(initDir, file), path.join(tarDir, file));
                } else {
                  fsPromises.copyFile(path.join(initDir, file), path.join(tarDir, file))
                    .catch(err => {throw err;});
                }
              });
            } catch (error) {
              console.log(error);
            }
          });
        })
        .catch(error => {throw error;});
    });
}

copyDir(path.join(__dirname,'files') ,path.join(__dirname,'files-copy'));