const userRepository = require("../repositories/user.repository");
const baseResponse = require("../utils/baseResponse.util");


exports.createUser = async (req, res) => {
    if (!req.query.name || !req.query.email || !req.query.password) {
        return baseResponse(res, false, 400, "Missing name, email, or password");
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    if (!emailRegex.test(req.query.email)) {
        return baseResponse(res, false, 400, "Email is invalid!");
    }

    if (!passwordRegex.test(req.query.password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long, has at least one number and one special character!");
    }

    try {
        const user = await userRepository.createUser(req.query);
        if (user == null) {
            throw new Error();
        }
        baseResponse(res, true, 201, "User created", user);
    } catch (error) {
        baseResponse(res, false, 400, "Email already used");
    }
};

exports.loginUser = async (req, res) => {
    if (!req.query.email || !req.query.password) {
        return baseResponse(res, false, 400, "Missing email or password");
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    if (!emailRegex.test(req.query.email)) {
        return baseResponse(res, false, 400, "Email is invalid!");
    }

    if (!passwordRegex.test(req.query.password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long, has at least one number and one special character!");
    }

    try {
        const user = await userRepository.loginUser(req.query);
        if (user == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "Login success", user);
    } catch (error) {
        baseResponse(res, false, 400, "Invalid email or password");
    }
};

exports.getUser = async (req, res) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(req.params.email)) {
        return baseResponse(res, false, 400, "Email is invalid!");
    }

    try {
        const user = await userRepository.getUser(req.params.email);
        if (user == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "User found", user);
    } catch (error) {
        baseResponse(res, false, 400, "User not found");
    }
};

exports.updateUser = async (req, res) => {
    if (!req.body.id || !req.body.name || !req.body.password || !req.body.email) {
        return baseResponse(res, false, 400, "Missing id, email, password, or name");
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    if (!emailRegex.test(req.body.email)) {
        return baseResponse(res, false, 400, "Email is invalid!");
    }

    if (!passwordRegex.test(req.body.password)) {
        return baseResponse(res, false, 400, "Password must be at least 8 characters long, has at least one number and one special character!");
    }

    try {
        const user = await userRepository.updateUser(req.body);
        if (user == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "User updated", user);
    } catch (error) {
        baseResponse(res, false, 400, "User not found");
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await userRepository.deleteUser(req.params['id']);
        if (user == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "User deleted", user);
    } catch (error) {
        baseResponse(res, false, 400, "User not found");
    }
};

