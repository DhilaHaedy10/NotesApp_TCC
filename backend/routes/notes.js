const express = require("express");
const router = express.Router();
const db = require("../db");

// GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM notes", (err, result) => {
    if (err) {
      console.error("GET /notes error:", err);
      return res.status(500).json({ message: "Gagal mengambil catatan", error: err.message });
    }

    res.json(result);
  });
});

// POST
router.post("/", (req, res) => {
  const { judul, isi } = req.body;

  db.query(
    "INSERT INTO notes (judul, isi) VALUES (?, ?)",
    [judul, isi],
    (err) => {
      if (err) {
        console.error("POST /notes error:", err);
        return res.status(500).json({ message: "Gagal menambah catatan", error: err.message });
      }

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
    (err) => {
      if (err) {
        console.error("PUT /notes/:id error:", err);
        return res.status(500).json({ message: "Gagal mengupdate catatan", error: err.message });
      }

      res.json({ message: "Update berhasil" });
    },
  );
});

// DELETE
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM notes WHERE id=?", [req.params.id], (err) => {
    if (err) {
      console.error("DELETE /notes/:id error:", err);
      return res.status(500).json({ message: "Gagal menghapus catatan", error: err.message });
    }

    res.json({ message: "Hapus berhasil" });
  });
});

module.exports = router;
