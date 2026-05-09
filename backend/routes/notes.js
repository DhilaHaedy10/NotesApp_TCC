const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { judul, isi } = req.body;
  const tanggal = new Date();

  db.query(
    "INSERT INTO notes (judul, isi, tanggal_dibuat) VALUES (?, ?, ?)",
    [judul, isi, tanggal],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Tambah berhasil" });
    },
  );
});

// PUT
router.put("/:id", (req, res) => {
  const { judul, isi } = req.body;
  db.query(
    "UPDATE notes SET judul=?, isi=? WHERE id=?",
    [judul, isi, req.params.id],
    () => res.json({ message: "Update berhasil" }),
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM notes WHERE id=?", [req.params.id], () =>
    res.json({ message: "Hapus berhasil" }),
  );
});

module.exports = router;
