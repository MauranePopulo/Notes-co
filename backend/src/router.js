const express = require("express");
const auth = require("./middlewares/auth");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");

// router.get("/user", auth.checkIfIsAllowed, userControllers.getUser);
router.get("/user", userControllers.getUser);

router.post(
  "/user",
  auth.validateUser,
  auth.hashPassword,
  userControllers.postUser
);
router.delete("/user/:id", userControllers.deleteUser);
router.post("/login", auth.checkEmailIfExist, userControllers.verifyPassword);

const noteControllers = require("./controllers/noteController");

router.get("/notes", noteControllers.getAllNotes);
router.get("/note/:id", noteControllers.getNotesById);
router.post("/note", noteControllers.postNote);
router.put("/note/:id", noteControllers.editNote);
router.delete("/note/:id", noteControllers.deleteNote);

module.exports = router;
