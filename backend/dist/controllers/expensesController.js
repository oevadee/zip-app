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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpenseNotifications = exports.rejectDeletion = exports.acceptDeletion = exports.requestDeletion = exports.getHistory = exports.createExpense = exports.getAllUserExpenses = void 0;
const db_1 = __importDefault(require("../config/db"));
const imagePath = `${process.env.SERVER}/users`;
const getAllUserExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = db_1.default.session();
    const { userId } = req.query;
    try {
        const usersQuery = yield session.run(`MATCH (a:User) WHERE NOT id(a) = toInteger($id) RETURN a`, { id: userId });
        const users = usersQuery.records.map((el) => (Object.assign({ id: el.get('a').identity.low, photo: el.get('a').properties.photo
                ? `${imagePath}/${el.get('a').properties.photo}`
                : null, total: 0 }, el.get('a').properties)));
        const expenses = [];
        for (const user of users) {
            const inExpensesQuery = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield txc.run(`MATCH (a:User)<-[:IS_OWED]-(e:Expense)<-[:OWES]-(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`, { id: userId, externalId: user.id });
                return result.records.map((el) => ({
                    value: el.get('e').properties.value,
                }));
            }));
            const incomingExpenses = inExpensesQuery.reduce((acc, curr) => acc + curr.value, 0);
            const outExpensesQuery = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield txc.run(`MATCH (a:User)-[:OWES]->(e:Expense)-[:IS_OWED]->(b:User) WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) RETURN e`, { id: userId, externalId: user.id });
                return yield result.records.map((el) => ({
                    value: el.get('e').properties.value,
                }));
            }));
            const outgoingExpenses = outExpensesQuery.reduce((acc, curr) => acc + curr.value, 0);
            const sum = incomingExpenses - outgoingExpenses;
            const userToAdd = Object.assign(Object.assign({}, user), { photo: `${imagePath}/${user.photo}` });
            const expense = {
                value: sum.toFixed(),
                user: userToAdd,
            };
            expenses.push(expense);
        }
        return res.json({ expenses, users });
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with getting user expenses' });
    }
    finally {
        session.close();
    }
});
exports.getAllUserExpenses = getAllUserExpenses;
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { values, timestamp } = req.body;
    const session = db_1.default.session();
    try {
        const { value, details, user } = values;
        const newValue = Math.abs(+value);
        const [expense] = yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User), (b:User) 
        WHERE id(a) = toInteger($id) AND id(b) = toInteger($externalId) 
        CREATE (a)-[:OWES]->(e:Expense {details: $details, timestamp: $timestamp, value: $value})-[:IS_OWED]->(b) RETURN e
      `, +value > 0
                ? {
                    id: user,
                    externalId: userId,
                    details,
                    timestamp,
                    value: newValue,
                }
                : +value === 0
                    ? new Error('You cant create an empy expense.')
                    : {
                        id: userId,
                        externalId: user,
                        details,
                        timestamp,
                        value: newValue,
                    });
            return result.records.map((el) => el.get('e').properties);
        }));
        return res.json(expense);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'The was an error while creating new expense.' });
    }
    finally {
        session.close();
    }
});
exports.createExpense = createExpense;
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { externalId } = req.params;
    const { userId } = req.query;
    const session = db_1.default.session();
    try {
        const outHistory = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User)-[:OWES]->(e:Expense)-[:IS_OWED]->(b:User)
        WHERE id(a) = toInteger($userId)
        AND id(b) = toInteger($externalId)
        RETURN b.name as name, b.photo as photo, e
      `, {
                userId,
                externalId,
            });
            return result.records.map((el) => (Object.assign({ name: el.get('name'), photo: el.get('photo') ? `${imagePath}/${el.get('photo')}` : null, id: el.get('e').identity.low }, el.get('e').properties)));
        }));
        const preparedOutHistory = outHistory.map((el) => (Object.assign(Object.assign({}, el), { value: -el.value })));
        const inHistory = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield txc.run(`
        MATCH (a:User)-[:OWES]->(e:Expense)-[:IS_OWED]->(b:User)
        WHERE id(a) = toInteger($externalId)
        AND id(b) = toInteger($userId)
        RETURN a.name as name, a.photo as photo, e
      `, {
                externalId,
                userId,
            });
            return result.records.map((el) => (Object.assign({ name: el.get('name'), photo: el.get('photo') ? `${imagePath}/${el.get('photo')}` : null, id: el.get('e').identity.low }, el.get('e').properties)));
        }));
        return res.json({
            inHistory,
            outHistory: preparedOutHistory,
        });
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with getting history' });
    }
    finally {
        session.close();
    }
});
exports.getHistory = getHistory;
const requestDeletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const values = req.body;
    const { user: userId, expenseId } = values;
    const session = db_1.default.session();
    try {
        yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            return yield txc.run(`
        MATCH (a:User), (e:Expense) 
        WHERE id(a) = toInteger($userId) 
        AND id(e) = toInteger($expenseId) 
        CREATE (a)-[:REQUESTED_DELETION]->(e)
        SET e.deletion_requested = TRUE
        RETURN a, e
      `, {
                userId,
                expenseId,
            });
        }));
        return res.json();
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with sending delete request.' });
    }
    finally {
        session.close();
    }
});
exports.requestDeletion = requestDeletion;
const acceptDeletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.query;
    const session = db_1.default.session();
    try {
        yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            return yield txc.run(`
        MATCH (e:Expense) WHERE id(e) = toInteger($notificationId)  DETACH DELETE e
      `, {
                notificationId,
            });
        }));
        return res.json();
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with accepting deletion request.' });
    }
    finally {
        session.close();
    }
});
exports.acceptDeletion = acceptDeletion;
const rejectDeletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { notificationId } = req.query;
    const session = db_1.default.session();
    try {
        yield session.writeTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            return yield txc.run(`
          MATCH (e:Expense)-[r:REQUESTED_DELETION]-() WHERE id(e) = toInteger($notificationId) REMOVE e.deletion_requested DELETE r RETURN e
      `, {
                notificationId,
            });
        }));
        return res.json();
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with accepting deletion request.' });
    }
    finally {
        session.close();
    }
});
exports.rejectDeletion = rejectDeletion;
const getExpenseNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    const session = db_1.default.session();
    try {
        const notifications = yield session.readTransaction((txc) => __awaiter(void 0, void 0, void 0, function* () {
            const inResult = yield txc.run(`
        MATCH (a:User), (b:User), (e:Expense) WHERE (a)-[:REQUESTED_DELETION]->(e)-[:IS_OWED]-(b) AND id(b) = toInteger($userId) AND NOT id(a) = toInteger($userId) RETURN a.name, a.photo, e
      `, { userId });
            const inToAdd = inResult.records.map((el) => (Object.assign(Object.assign({ id: el.get('e').identity.low }, el.get('e').properties), { name: el.get('a.name'), photo: el.get('a.photo') })));
            const outResult = yield txc.run(`
        MATCH (a:User), (b:User), (e:Expense) WHERE (a)-[:REQUESTED_DELETION]->(e)-[:OWES]-(b) AND id(b) = toInteger($userId) AND NOT id(a) = toInteger($userId) RETURN a.name, a.photo, e
      `, { userId });
            const outToAdd = outResult.records.map((el) => (Object.assign(Object.assign({ id: el.get('e').identity.low }, el.get('e').properties), { name: el.get('a.name'), photo: el.get('a.photo') })));
            return outToAdd
                .map((el) => (Object.assign(Object.assign({}, el), { value: -el.value })))
                .concat(inToAdd);
        }));
        return res.json(notifications);
    }
    catch (err) {
        console.error(err);
        return res
            .status(400)
            .json({ message: 'There was an error with getting all notifications.' });
    }
    finally {
        session.close();
    }
});
exports.getExpenseNotifications = getExpenseNotifications;
//# sourceMappingURL=expensesController.js.map