const db = require("../database/pg.database");

exports.getAllNotes = async () => {
    try {
        const res = await db.query("SELECT * FROM notes");
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.createNote = async (note) => {
    try {
        const res = await db.query(
            "INSERT INTO notes (title, text, user_id) VALUES ($1, $2, $3) RETURNING *",
            [note.title, note.text, note.user_id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getNote = async (id) => {
    try {
        const res = await db.query(
            "SELECT * FROM notes WHERE id = $1",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.getNotesByUser = async (id) => {
    try {
        const res = await db.query(
            "SELECT * FROM notes WHERE user_id = $1",
            [id]
        );
        return res.rows;
    } catch (error) {
        console.error("Error executing query", error);
    }
};


exports.updateNote = async (note) => {
    try {
        const res = await db.query(
            "UPDATE notes SET (title, text, user_id) = ($1, $2, $3) WHERE id = $4 RETURNING *",
            [note.title, note.text, note.user_id, note.id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};

exports.deleteNote = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM notes WHERE id = $1 RETURNING *",
            [id]
        );
        return res.rows[0];
    } catch (error) {
        console.error("Error executing query", error);
    }
};
