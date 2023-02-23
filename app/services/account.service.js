const { ObjectId } = require("mongodb");

class AccountService {
    constructor(client) {
        this.Account = client.db().collection("accounts");
    }

    extractAccountData(payload) {
        const account = {
            username: payload.username,
            password: payload.password,
        };

        Object.keys(account).forEach(
            (key) => account[key] === undefined && delete account[key]
        );
        return account;
    }

    async create(payload) {
        const account = this.extractAccountData(payload);
        const result = await this.Account.insertOne(account);
        return result.value;
    }

    async findByUsername(username) {
        return await this.Account.findOne({
            username: { $regex: new RegExp(username), $options: "i"},
        });
    }
}

module.exports = AccountService;