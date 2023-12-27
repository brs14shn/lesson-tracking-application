let lessons = JSON.parse(localStorage.getItem('lessons')) || [];

function renderLessonsTable() {
  const table = document.getElementById('lessons-table');
  table.innerHTML = '<h2>Dersler</h2>';

  if (lessons.length === 0) {
    table.innerHTML += '<p>Henüz bir ders yok.</p>';
    return;
  }

  const headerRow = '<tr><th>Ders Adı</th><th>Kredi</th><th>Not Ortalaması</th><th>Sınav Tarihi</th><th>İşlemler</th></tr>';
  table.innerHTML += `<table>${headerRow}</table>`;

  const tbody = table.querySelector('table');

  lessons.forEach((lesson, index) => {
    const row = `
      <tr>
        <td>${lesson.name}</td>
        <td>${lesson.credit}</td>
        <td>${lesson.averageGrade}</td>
        <td>${lesson.examdate}</td>
        <td>
          <button onclick="openLessonDetail(${index})">Detay</button>
          <button onclick="openEditLessonModal(${index})">Düzenle</button>
          <button onclick="deleteLesson(${index})">Sil</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function openLessonDetail(index) {
  const lesson = lessons[index];
  console.log("lesson",lesson);

  const detailHTML = `
    <h2>${lesson.name}</h2>
    <p><strong>Kredi:</strong> ${lesson.credit}</p>
    <p><strong>Kategori:</strong> ${lesson.category}</p>
    <p><strong>Not Ortalaması:</strong> ${lesson.averageGrade}</p>
    <progress value="${lesson.progressBar}" max="100"></progress> 
    ${lesson.progressBar}%

    <p><strong>Mevzuat Okunma Durumu:</strong> ${lesson.lawRead ? 'Okundu' : 'Okunmadı'}</p>
    <p><strong>Pratik Çözülme Durumu:</strong> ${lesson.practiceSolved ? 'Çözüldü' : 'Çözülmedi'}</p>
    <p><strong>Çıkmış Soru Çözme Durumu:</strong> ${lesson.examSolved ? 'Çözüldü' : 'Çözülmedi'}</p>
    <p><strong>Son Kalınan Konu veya Sayfa:</strong> ${lesson.lastTopic || 'Belirtilmemiş'}</p>

    <button onclick="openEditLessonModal(${index})">Düzenle</button>
    <button onclick="deleteLesson(${index}); closeLessonDetailModal()">Sil</button>
  `;

  const detailContainer = document.getElementById('lesson-detail-content');
  detailContainer.innerHTML = detailHTML;

  const modal = document.getElementById('lesson-detail-modal');
  modal.style.display = 'block';
}

function closeLessonDetailModal() {
  const modal = document.getElementById('lesson-detail-modal');
  modal.style.display = 'none';
}

function addLesson(lesson) {
  
  lessons.push(lesson);
  localStorage.setItem("lessons", JSON.stringify(lessons));
  renderLessonsTable();
  closeAddLessonModal();
}

function editLesson(index, editedLesson) {
  lessons[index] = editedLesson;
  localStorage.setItem("lessons", JSON.stringify(lessons));
  renderLessonsTable();
}

function deleteLesson(index) {
  lessons.splice(index, 1);
  localStorage.setItem("lessons", JSON.stringify(lessons));
  renderLessonsTable();
}

function handleAddLessonForm() {
  const name = document.getElementById('lesson-name').value;
  const credit = document.getElementById('lesson-credit').value;
  const examdate =document.getElementById('lesson-examdate').value;
  const category = document.getElementById('lesson-category').value;
  const averageGrade = document.getElementById('lesson-average-grade').value;
  const lawRead = document.getElementById('law-read').checked;
  const practiceSolved = document.getElementById('practice-solved').checked;
  const examSolved = document.getElementById('exam-solved').checked;
  const lastTopic = document.getElementById('last-topic').value;
  const progress= document.getElementById('progress-bar').value;
  const progressBar =parseInt(progress)

  const newLesson = {
    name,
    credit,
    examdate,
    category,
    averageGrade,
    lawRead,
    practiceSolved,
    examSolved,
    lastTopic,
    progressBar
  };

  addLesson(newLesson);
}

function openAddLessonModal() {
  const modal = document.getElementById('add-lesson-modal');
  modal.style.display = 'block';
}

function closeAddLessonModal() {
  const modal = document.getElementById('add-lesson-modal');
  modal.style.display = 'none';
}

renderLessonsTable();

window.onload = function () {
  try {
    const storedLessons = localStorage.getItem('lessons');
    if (storedLessons) {
      lessons = JSON.parse(storedLessons);
      renderLessonsTable(); 
    }
  } catch (error) {
    console.error('Local storage error:', error);
  }
};


// Düzenleme için seçili dersin index'ini saklamak için bir değişken
let selectedLessonIndex;

// Ders düzenleme modalını aç
function openEditLessonModal(index) {
console.log("index",index);
selectedLessonIndex = index;
 const lesson = lessons[index];
 console.log("lesson",lesson);
  const editModal = document.getElementById('edit-lesson-modal');
  editModal.style.display = 'block';

// Düzenleme formunu seç
const editLessonForm = document.getElementById('edit-lesson-form');

// Formdaki alanlara erişim sağla
const lessonNameInput = editLessonForm.querySelector('#lesson-name');
const lessonCreditInput = editLessonForm.querySelector('#lesson-credit');
const lessonEamDate = editLessonForm.querySelector('#lesson-examdate');
const lessonCategoryInput = editLessonForm.querySelector('#lesson-category');
const lessonAverageGradeInput = editLessonForm.querySelector('#lesson-average-grade');
const lawReadCheckbox = editLessonForm.querySelector('#law-read');
const practiceSolvedCheckbox = editLessonForm.querySelector('#practice-solved');
const examSolvedCheckbox = editLessonForm.querySelector('#exam-solved');
const lastTopicInput = editLessonForm.querySelector('#last-topic');
const progressBarInput = editLessonForm.querySelector('#progress-bar');

// Ders verilerini form alanlarına yerleştir
lessonNameInput.value = lesson.name;
lessonCreditInput.value = lesson.credit;
lessonEamDate.value =lesson.examdate;
lessonCategoryInput.value = lesson.category;
lessonAverageGradeInput.value = lesson.averageGrade;
lawReadCheckbox.checked = lesson.lawRead;
practiceSolvedCheckbox.checked = lesson.practiceSolved;
examSolvedCheckbox.checked = lesson.examSolved;
lastTopicInput.value = lesson.lastTopic;
progressBarInput.value = lesson.progress;
}

// Ders düzenleme modalını kapat
function closeEditLessonModal() {
  const editModal = document.getElementById('edit-lesson-modal');
  editModal.style.display = 'none';
}

// Ders düzenleme formunu işle
function handleEditLessonForm() {
    const editLessonForm = document.getElementById('edit-lesson-form');

  // Formdaki alanlara erişim sağla
  const lessonNameInput = editLessonForm.querySelector('#lesson-name');
  const lessonCreditInput = editLessonForm.querySelector('#lesson-credit');
  const lessonEamDate = editLessonForm.querySelector('#lesson-examdate');
  const lessonCategoryInput = editLessonForm.querySelector('#lesson-category');
  const lessonAverageGradeInput = editLessonForm.querySelector('#lesson-average-grade');
  const lawReadCheckbox = editLessonForm.querySelector('#law-read');
  const practiceSolvedCheckbox = editLessonForm.querySelector('#practice-solved');
  const examSolvedCheckbox = editLessonForm.querySelector('#exam-solved');
  const lastTopicInput = editLessonForm.querySelector('#last-topic');
  const progressBarInput = editLessonForm.querySelector('#progress-bar');

  const name = lessonNameInput.value;
  const credit = lessonCreditInput.value;
  const examdate =lessonEamDate.value;
  const category = lessonCategoryInput.value;
  const averageGrade = lessonAverageGradeInput.value;
  const lawRead = lawReadCheckbox.checked;
  const practiceSolved = practiceSolvedCheckbox.checked;
  const examSolved = examSolvedCheckbox.checked;
  const lastTopic = lastTopicInput.value;
  const progressBar = parseInt(progressBarInput.value);

  const editedLesson = {
    name,
    credit,
    examdate,
    category,
    averageGrade,
    lawRead,
    practiceSolved,
    examSolved,
    lastTopic,
    progressBar
  };


  // Düzenlenen dersi güncelle ve modalı kapat
  editLesson(selectedLessonIndex, editedLesson);
  closeEditLessonModal();
}


const dateSpan = document.getElementById('date-span');
const currentDate = new Date();
const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

dateSpan.textContent = formattedDate;