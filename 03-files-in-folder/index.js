const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const curPath = (__dirname + '/secret-folder');
const { readdir } = fsPromises;

try {
  readdir(curPath)
    .then(files => {
      files.forEach(file => {
        const filePath = path.join(curPath, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            throw err;
          }

          if (stats.isFile()) {
            const name = path.basename(filePath);
            const ext = path.extname(filePath).slice(1);
            const size = stats.size;

            console.log(`${name} - ${ext} - ${(size / 1024).toFixed(3)}kb`);
          }
        });
      });
    });

} catch (error) {
  console.error(error);
}