"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.updateProfile = exports.getProfile = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../config/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usersStorage_1 = require("../storage/usersStorage");
const fs_1 = __importDefault(require("fs"));
const imagePath = `${process.env.SERVER}/users`;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = db_1.default.session();
    try {
        const { email, password } = req.body;
        const [dbUser] = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User {email: $email})
        RETURN a
      `, { email: email });
            return result.records.map((el) => (Object.assign({ id: el.get('a').identity.low }, el.get('a').properties)));
        }));
        const { password: dbPassword } = dbUser, restOfDbUser = __rest(dbUser, ["password"]);
        if (bcryptjs_1.default.compareSync(password, dbPassword)) {
            const userToAdd = Object.assign(Object.assign({}, restOfDbUser), { photo: `${imagePath}/${dbUser.photo}` });
            jsonwebtoken_1.default.sign({ id: userToAdd.id }, 'secretkey', (err, token) => {
                if (err)
                    return res.status(403);
                return res.json({
                    user: userToAdd,
                    token,
                });
            });
        }
        else
            return res.status(400).json({ message: 'Auth failed.' });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Auth failed.' });
    }
    finally {
        session.close();
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = db_1.default.session();
    try {
        const { email, password, confirmPassword, name } = req.body;
        const [dbUser] = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User {email: $email}) RETURN a
      `, {
                email,
            });
            return result.records.map((el) => (Object.assign({ id: el.get('a').identity.low }, el.get('a').properties)));
        }));
        if (!dbUser && password === confirmPassword) {
            const hash = yield bcryptjs_1.default.hash(password, 10);
            const [newUser] = yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield txc.run(`
        CREATE (a:User {email: $email, password: $password, name: $name}) RETURN a
      `, {
                    email,
                    password: hash,
                    name,
                });
                return result.records.map((el) => (Object.assign({ id: el.get('a').identity.low }, el.get('a').properties)));
            }));
            const { password: newPassword } = newUser, userToAdd = __rest(newUser, ["password"]);
            jsonwebtoken_1.default.sign({ id: userToAdd.id }, 'secretkey', (err, token) => {
                if (err)
                    return res.status(403);
                return res.json({
                    user: userToAdd,
                    token,
                });
            });
        }
        else
            return res
                .status(400)
                .json({ message: 'There was an error with registration new account' });
    }
    catch (err) {
        console.error(err);
        return res.status(400).json({
            message: 'There was an error with registration new account.',
        });
    }
    finally {
        session.close();
    }
});
exports.register = register;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const session = db_1.default.session();
    if (!userId) {
        console.log('Auth failed!');
        return res.json();
    }
    try {
        const [user] = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User) WHERE id(a) = toInteger($userId) RETURN a
      `, { userId });
            return result.records.map((el) => ({
                id: el.get('a').identity.low,
                name: el.get('a').properties.name,
                email: el.get('a').properties.email,
                photo: `${imagePath}/${el.get('a').properties.photo}`,
            }));
        }));
        return res.json(user);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with getting profile info.' });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    usersStorage_1.upload(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId } = req.query;
        const session = db_1.default.session();
        const values = JSON.parse(req.body.values);
        if (err) {
            return res
                .status(400)
                .json({ message: err.message });
        }
        try {
            const { password, confirmPassword, name } = values;
            if (password && password === confirmPassword) {
                const hash = yield bcryptjs_1.default.hash(password, 10);
                yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                    yield txc.run(`
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.password = $hash
          `, { userId, hash });
                }));
            }
            if (name) {
                yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                    yield txc.run(`
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.name = $name
          `, {
                        userId,
                        name,
                    });
                }));
            }
            //@ts-ignore
            if (req.files.file) {
                //@ts-ignore
                const photo = req.files.file[0].filename;
                const [oldPhoto] = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                    const result = yield txc.run(`MATCH (a: User) WHERE id(a) = toInteger($userId) RETURN a.photo`, {
                        userId
                    });
                    return result.records.map((r) => ({
                        photo: r.get("a.photo")
                    }));
                }));
                yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                    txc.run(`
            MATCH (a:User) WHERE id(a) = toInteger($userId) SET a.photo = $photo
          `, {
                        userId,
                        photo,
                    }).then(() => {
                        try {
                            console.log();
                            fs_1.default.unlinkSync(process.env.PWD + process.env.USERIMAGES + oldPhoto.photo);
                        }
                        catch (err) {
                            console.log("Failed to unlink old photo");
                        }
                    }).catch(err => {
                        console.log("Failed to update photo");
                    });
                }));
            }
            return res.json({
                message: 'Profile updated.',
            });
        }
        catch (err) {
            console.error(err);
            return res
                .status(400)
                .json({ message: 'There was an error with updating profile.' });
        }
        finally {
            session.close();
        }
    }));
});
exports.updateProfile = updateProfile;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = db_1.default.session();
    try {
        const users = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (u:User) RETURN u as user
        `);
            return result.records.map((el) => (Object.assign({ id: el.get('user').identity.low, photo: `${imagePath}/${el.get('user').properties.photo}` }, el.get('user').properties)));
        }));
        return res.json(users);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error while loading users' });
    }
    finally {
        session.close();
    }
});
exports.getUsers = getUsers;
//# sourceMappingURL=usersController.js.map