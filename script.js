
function addNotes() {
  let input = document.querySelector('.noteInput');
  let text = input.value;

  if (text.trim() === "") return;

  let note = {
    id: Date.now(),
    content: text
  };

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(note);

  localStorage.setItem("notes", JSON.stringify(notes));

  showNote(note);
  input.value = "";
}

// Show Note
function showNote(note) {
  let card = document.createElement('div');
  card.classList.add('note-card');

  let text = document.createElement('p');
  text.textContent = note.content;

  let delBtn = document.createElement('button');
  delBtn.innerText = "Delete";
  delBtn.classList.add('delete-btn');

  delBtn.addEventListener('click', function () {
    deleteNote(note.id, card);
  });

  card.appendChild(text);
  card.appendChild(delBtn);

  let grid = document.getElementById('notesGrid');
  if (grid) grid.appendChild(card);
}

// Delete Note
function deleteNote(id, element) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(note => note.id !== id);

  localStorage.setItem("notes", JSON.stringify(notes));
  element.remove();
}

// =======================
// TASK SECTION
// =======================

// Add Task


// Delete Task
function deleteTask(id, element) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.id !== id);

  localStorage.setItem("tasks", JSON.stringify(tasks));
  element.remove();
}

// Update Task Status
function updateTaskStatus(id, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = completed;
    }
    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// =======================
// LOAD DATA ON PAGE LOAD
// =======================

window.onload = function () {
  // Load Notes
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.forEach(note => showNote(note));

  // Load Tasks
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => showTask(task));
};

// =======================
// BUTTON EVENTS
// =======================

// Notes button
let noteBtn = document.querySelector(".save-btn");
if (noteBtn) {
  noteBtn.addEventListener('click', addNotes);
}

// Task button
let taskBtn = document.querySelector(".start-btn");
if (taskBtn) {
  taskBtn.addEventListener('click', addTask);
}function addTask() {
  let input = document.querySelector('#task-input');
  let text = input.value;

  if (text.trim() === "") return;

  let task = {
    id: Date.now(),
    content: text,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTask(task);
  input.value = "";
}

// Show Task
function showTask(task) {
  let li = document.createElement('li');

  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  let text = document.createElement('span');
  text.textContent = task.content;

  // strike-through if completed
  if (task.completed) {
    text.style.textDecoration = "line-through";
    
  }

  checkbox.addEventListener("change", function () {
    text.style.textDecoration = checkbox.checked ? "line-through" : "none";
    updateTaskStatus(task.id, checkbox.checked);
  });
  let deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function () {
    deleteTask(task.id, li);
  });

  li.appendChild(checkbox);
  li.appendChild(text);
  li.appendChild(deleteBtn);

  let list = document.querySelectorAll(".task-list");
  if (list) {
    list.forEach(ul => ul.appendChild(li));
  }
  
}
let minutes = 25;
let second = 0;
let timer = null;

let startBtn = document.querySelector("#timer-start-btn");
let pauseBtn = document.querySelector("#timer-pause-btn");
let resetBtn = document.querySelector("#timer-reset-btn");
let timerDisplay = document.getElementById("timer");

// Start
startBtn.addEventListener("click", function () {
  if (timer !== null) return;
  timer = setInterval(updateTimer, 1000);
});

// Update
function updateTimer() {
  if (second === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      timer = null;
      alert("Time's up!");
      return;
    }
    minutes--;
    second = 59;
  } else {
    second--;
  }
  displayTimer();
}

// Display
function displayTimer() {
  let min = minutes < 10 ? "0" + minutes : minutes;
  let sec = second < 10 ? "0" + second : second;
  timerDisplay.textContent = min + ":" + sec;
}

// Pause
if (pauseBtn) {
  pauseBtn.addEventListener("click", function () {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    clearInterval(timer);
    timer = null;
    minutes = 25;
    second = 0;
    displayTimer();
  });
}