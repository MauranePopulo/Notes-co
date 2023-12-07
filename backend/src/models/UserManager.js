const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }
  // C'EST ICI QU'ON VA METTRE TOUTES NOS METHODES DE REQUETES

  insert(email, hashedPassword) {
    return this.database.query(
      `insert into user (email, hashedPassword) values (?, ?)`,
      [email, hashedPassword]
    );
  }

  update(email, hashedPassword, id) {
    return this.database.query(
      `update user set email = ?, password = ? where id = ?`,
      [email, hashedPassword, id]
    );
  }

  searchByEmail(email) {
    return this.database.query(`SELECT * FROM user WHERE email = ?`, [email]);
  }
}
module.exports = UserManager;
