/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class NoteManager extends AbstractManager {
  constructor() {
    super({ table: "note" });
  }

  insert(title, description, user_id) {
    return this.database.query(
      `insert into note (title, description, user_id) values (?, ?, ?)`,
      [title, description, user_id]
    );
  }

  findNotesById(id) {
    return this.database.query(`SELECT * FROM note WHERE id = ?`, [id]);
  }

  update(note, id) {
    return this.database.query(
      `UPDATE note SET title = ?, description = ?, user_id = ? WHERE id = ?`,
      [note.title, note.description, note.user_id, id]
    );
  }
}
module.exports = NoteManager;
