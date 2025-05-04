const db = require("../database/pg.database");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getAllUsers = async () => {
    try {
        const res = await db.query("SELECT * FROM users");
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.createUser = async (user) => {
    try {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        const res = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [user.name, user.email, hash]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.loginUser = async (user) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [user.email]
        );
        
        if (!bcrypt.compareSync(user.password, res.rows[0].password)) {
            return null;
        }
        
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getUser = async (email) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getUserById = async (id) => {
    try {
        const res = await db.query(
            "SELECT * FROM users WHERE id = $1",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.updateUser = async (user) => {
    try {
        const hash = bcrypt.hashSync(user.password, saltRounds);
        const res = await db.query(
            "UPDATE users SET (email, password, name) = ($1, $2, $3) WHERE id = $4 RETURNING *",
            [user.email, hash, user.name, user.id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.deleteUser = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM users WHERE id = $1 RETURNING *",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};
