const models = require("../models");

const getAllNotes = (req, res) => {
  models.note
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getNotesById = (req, res) => {
  models.note
    .findNotesById(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postNote = (req, res) => {
  // eslint-disable-next-line camelcase
  const { title, description, user_id } = req.body;

  models.note
    .insert(title, description, user_id)
    .then(([result]) => {
      console.info(result);
      res.status(200).json({ message: "Note crée avec succès", title });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.errno,
      });
    });
};

const editNote = (req, res) => {
  const { id } = req.params;
  const note = req.body;

  console.error("test", note);

  models.note
    .update(note, id)
    .then(([result]) => {
      console.info(result);
      res.status(200).send("Votre note a bien été modifiée");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Erreur lors de la modification");
    });
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  console.info("ID DELETE: ", id);
  models.note.delete(id).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send(result);
    } else {
      res.status(200).send("Note supprimée avec succès");
    }
  });
};
module.exports = {
  getAllNotes,
  postNote,
  getNotesById,
  editNote,
  deleteNote,
};
