const noteRepository = require("../repositories/note.repository");
const baseResponse = require("../utils/baseResponse.util");

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await noteRepository.getAllNotes();
        baseResponse(res, true, 200, "Notes found", notes);
    } catch (error) {
        baseResponse(res, false, 500, "Error retrieving notes", error);
    }
};

exports.createNote = async (req, res) => {
    if (!req.body.title || !req.body.user_id) {
        return baseResponse(res, false, 400, "Missing note title or user_id");
    }
    try {
        const note = await noteRepository.createNote(req.body);
        baseResponse(res, true, 201, "Note created", note);
    } catch (error) {
        baseResponse(res, false, 500, error.message || "Error creating note");
    }
};

exports.getNote = async (req, res) => {
    try {
        const note = await noteRepository.getNote(req.params['id']);
        if (note == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "Note found", note);
    } catch (error) {
        baseResponse(res, false, 400, "Note not found");
    }
};

exports.getNotesByUser = async (req, res) => {
    try {
        const notes = await noteRepository.getNotesByUser(req.params['id']);
        if (notes == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "Note(s) found", notes);
    } catch (error) {
        baseResponse(res, false, 400, "Note not found");
    }
};

exports.updateNote = async (req, res) => {
    if (!req.body.id || !req.body.title || !req.body.user_id) {
        return baseResponse(res, false, 400, "Missing note id, title, or user_id");
    }
    try {
        const note = await noteRepository.updateNote(req.body);
        if (note == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "Note updated", note);
    } catch (error) {
        baseResponse(res, false, 400, error.message || "Note not found");
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await noteRepository.deleteNote(req.params['id']);
        if (note == null) {
            throw new Error();
        }
        baseResponse(res, true, 200, "Note deleted", note);
    } catch (error) {
        baseResponse(res, false, 400, "Note not found");
    }
};
