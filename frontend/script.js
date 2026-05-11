const API = "https://notes-backend-521926891872.asia-southeast2.run.app/notes";

const { createApp } = Vue;

createApp({
  data() {
    return {
      notes: [],
      editId: null,
      isModalOpen: false,
      selectedNote: null,
      form: {
        judul: "",
        isi: "",
      },
    };
  },
  computed: {
    modalTitle() {
      return this.editId ? "Edit Catatan" : "Tambah Catatan";
    },
  },
  mounted() {
    this.loadNotes();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString("id-ID");
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.editId = null;
      this.form.judul = "";
      this.form.isi = "";
    },
    async loadNotes() {
      const res = await fetch(API);
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal memuat catatan");
        this.notes = [];
        return;
      }

      this.notes = Array.isArray(data) ? data : [];
    },
    async saveNote() {
      const { judul, isi } = this.form;

      if (!judul || !isi) {
        alert("Isi semua!");
        return;
      }

      const url = this.editId ? `${API}/${this.editId}` : API;
      const method = this.editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal menyimpan catatan");
        return;
      }

      this.closeModal();
      this.loadNotes();
    },
    editNote(note) {
      this.editId = note.id;
      this.form.judul = note.judul;
      this.form.isi = note.isi;
      this.selectedNote = null;
      this.openModal();
    },
    viewNote(note) {
      this.selectedNote = note;
    },
    closeDetail() {
      this.selectedNote = null;
    },
    editFromDetail() {
      this.editNote(this.selectedNote);
    },
    async deleteFromDetail() {
      const id = this.selectedNote.id;
      this.closeDetail();
      await this.deleteNote(id);
    },
    async deleteNote(id) {
      if (!confirm("Hapus?")) return;

      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Gagal menghapus catatan");
        return;
      }

      this.loadNotes();
    },
  },
}).mount("#app");
