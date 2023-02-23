const AccountService = require("../services/account.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if(!req.body?.username || !req.body?.password) {
        return next(new ApiError(400, "Username or password can not be empty"));
    }

    try {
        const accountService = new AccountService(MongoDB.client);
        console.log("abc");
        const document = await accountService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};

exports.login = async (req, res, next) => {
    let documents = [];

    try {
        const accountService = new AccountService(MongoDB.client);
        const {username, password} = req.body;

        if(username) {
            documents = await accountService.findByUsername(username);
            console.log(documents.password);
            if(documents) {
                if(documents.password == password) {
                    res.send("Dang nhap thanh cong");
                } else {
                    res.send("Sai mat khau");
                }
            }
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return 0;
}