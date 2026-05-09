const API = 'https://notes-backend-521926891872.asia-southeast2.run.app/notes';

const { createApp } = Vue;

createApp({
  data() {
    return {
      notes: [],
      editId: null,
      isModalOpen: false,
      form: {
        judul: '',
        isi: '',
      },
    };
  },
  computed: {
    modalTitle() {
      return this.editId ? 'Edit Catatan' : 'Tambah Catatan';
    },
  },
  mounted() {
    this.loadNotes();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString('id-ID');
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.editId = null;
      this.form.judul = '';
      this.form.isi = '';
    },
    async loadNotes() {
      const res = await fetch(API);
      this.notes = await res.json();
    },
    async saveNote() {
      const { judul, isi } = this.form;

      if (!judul || !isi) {
        alert('Isi semua!');
        return;
      }

      const url = this.editId ? `${API}/${this.editId}` : API;
      const method = this.editId ? 'PUT' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judul, isi }),
      });

      this.closeModal();
      this.loadNotes();
    },
    editNote(note) {
      this.editId = note.id;
      this.form.judul = note.judul;
      this.form.isi = note.isi;
      this.openModal();
    },
    async deleteNote(id) {
      if (!confirm('Hapus?')) return;

      await fetch(`${API}/${id}`, { method: 'DELETE' });
      this.loadNotes();
    },
  },
}).mount('#app');
