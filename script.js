const API = 'http://localhost:3000/notes';

let editId = null;

// FORMAT
function formatDate(date) {
  return new Date(date).toLocaleString('id-ID');
}

// MODAL
function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  document.getElementById('judul').value = '';
  document.getElementById('isi').value = '';
  editId = null;
  document.getElementById('modalTitle').innerText = 'Tambah Catatan';
}

// LOAD
async function loadNotes() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById('list');
  const fab = document.querySelector('.fab');

  if (data.length === 0) {
    fab.classList.add('center');
    return;
  }

  fab.classList.remove('center');

  list.innerHTML = data.map(n => `
    <div class="card">
      <div class="card-title">${n.judul}</div>
      <div class="card-date">${formatDate(n.tanggal_dibuat)}</div>
      <div>${n.isi}</div>

      <div class="card-actions">
        <button onclick='editNote(${n.id}, ${JSON.stringify(n.judul)}, ${JSON.stringify(n.isi)})'>✏️ Edit</button>
        <button onclick="deleteNote(${n.id})">🗑️ Hapus</button>
      </div>
    </div>
  `).join('');
}

// SAVE
async function saveNote() {
  const judul = document.getElementById('judul').value;
  const isi = document.getElementById('isi').value;

  if (!judul || !isi) return alert('Isi semua!');

  if (editId) {
    await fetch(`${API}/${editId}`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ judul, isi })
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ judul, isi })
    });
  }

  closeModal();
  loadNotes();
}

// EDIT
function editNote(id, judul, isi) {
  editId = id;
  document.getElementById('judul').value = judul;
  document.getElementById('isi').value = isi;
  document.getElementById('modalTitle').innerText = 'Edit Catatan';
  openModal();
}

// DELETE
async function deleteNote(id) {
  if (!confirm('Hapus?')) return;
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadNotes();
}

// INIT
loadNotes();