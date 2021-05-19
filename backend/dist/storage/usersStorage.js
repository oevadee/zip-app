"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadsPath = void 0;
const multer_1 = __importDefault(require("multer"));
const fields = [{ name: 'file', maxCount: 1 }];
const limits = {
    fileSize: 5 * 1000000, //x megabytes
};
exports.uploadsPath = `./src/uploads/users`;
const fileFilter = (req, file, cb) => {
    const accepted = {
        file: {
            mimetypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'],
            text: 'JPG, PNG, WEBP lub SVG',
        },
    };
    if (accepted[file.fieldname].mimetypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    else {
        const err = new Error(`Niedozwolony format pliku. Użyj ${accepted[file.fieldname].text}.`);
        err.code = 'CUSTOM';
        return cb(err);
    }
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, exports.uploadsPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`);
    },
});
exports.upload = multer_1.default({
    storage,
    limits,
    fileFilter,
}).fields(fields);
//# sourceMappingURL=usersStorage.js.map