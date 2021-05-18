import fs from 'fs';

const unlinkFile = (path) => {
  fs.unlinkSync(path);
};
