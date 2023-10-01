const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Notes");

// Route 1 : Get all the notes Get : "api/notes/fetchalluser"  login require
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const note = await Note.find({ user: req.user.id });
  res.json(note);
});

// Route 2: Add a new notes Using : post " api/notes/addnotes" . login reqiure
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    //if there is any error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, error: " Enter valid Details" });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      success = true;
      res.json({
        success,
        message: " Note Added Successfully",
        saveNote,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: " Internal Server Error" });
    }
  }
);

// Route 3: Update an exixting Note   -  put " api/notes/updatenote" . login reqiure
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    let success = false;
    try {
      const { title, description, tag } = req.body;

      //create a newnote object

      const newnote = {};
      if (title) {
        newnote.title = title;
      }
      if (description) {
        newnote.description = description;
      }
      if (tag) {
        newnote.tag = tag;
      }

      //Find the note to be Updated

      let note = await Note.findById(req.params.id); //notes/updatenote/:id

      if (!note) {
        return res.status(404).send({ success, error: "Note not found" });
      }

      if (note.user.toString() != req.user.id) {
        return res.status(401).send({ success, error: "Not Allowed" });
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newnote },
        { new: true }
      );
      success = true;
      res.json({ success, note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ success, error: "Iternal Server error" });
    }
  }
);

// Route 4: Delete an exixting Note   -  Delete " api/notes/deletenote" . login reqiure
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    let success = false;
    try {
      //Find the note to be Deleted

      let note = await Note.findById(req.params.id); //notes/deletenote/:id

      if (!note) {
        return res.status(404).send({ success, error: "Note not found" });
      }
      //Allowed deletion if user owns this note
      if (note.user.toString() !== req.user.id) {
        return res
          .status(401)
          .send({ success, error: "Not Allowed to Delete this Note" });
      }

      note = await Note.findByIdAndDelete(req.params.id);
      success = true;
      res.json({ success, message: "Note has been Deleted  Successfully" });
    } catch (errors) {
      console.error(errors.message);
      res.status(500).send({ success, error: "Iternal Server error" });
    }
  }
);

module.exports = router;
