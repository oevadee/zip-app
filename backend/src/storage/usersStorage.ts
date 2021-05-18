import multer from 'multer';
import path from 'path';

const fields = [{ name: 'file', maxCount: 1 }];

const limits = {
  fileSize: 5 * 1000000, //x megabytes
};

export const uploadsPath = `./src/uploads/users`;

const fileFilter = (req: any, file: any, cb: any) => {
  interface IAcceptedFiles {
    file: {
      mimetypes: string[];
      text: string;
    };
  }

  interface IError {
    status?: number;
    code?: string;
    message: string;
  }

  const accepted: IAcceptedFiles = {
    file: {
      mimetypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
      text: 'JPG, PNG, WEBP lub SVG',
    },
  };

  if (accepted[file.fieldname].mimetypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    const err: IError = new Error(
      `Niedozwolony format pliku. Użyj ${accepted[file.fieldname].text}.`
    );
    err.code = 'CUSTOM';
    return cb(err);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}.${file.originalname.split('.').pop()}`);
  },
});

export const upload = multer({
  storage,
  limits,
  fileFilter,
}).fields(fields);
