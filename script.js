const taskList = document.querySelector("#listaTask");
const input = document.querySelector("#task");
const bottone = document.querySelector("#aggiungi");
const removeAllButton = document.createElement("button"); // Pulsante per rimuovere tutte le attività
const counter = document.createElement("div"); // Contatore delle attività

removeAllButton.textContent = "Rimuovi tutte le attività";
removeAllButton.id = "removeAll";
document.body.appendChild(removeAllButton);
document.body.appendChild(counter);

// Gestione degli eventi per il pulsante "aggiungi"
bottone.addEventListener("mouseenter", function () {
  document.body.style.background = "linear-gradient(45deg, #3a7bd5, #000000)";
});

bottone.addEventListener("mouseleave", function () {
  document.body.style.background = "linear-gradient(45deg, #000000, #3a7bd5)";
});

bottone.addEventListener("click", function () {
  const taskInserita = input.value.trim();

  if (taskInserita) {
    aggiungiTask(taskInserita);
    input.value = "";
  } else {
    alert("Non lasciare campi vuoti");
  }
});

// Funzione per aggiungere una task
function aggiungiTask(taskInserita) {
  const lista = document.createElement("div");
  lista.classList.add("taskItem");

  const taskText = document.createElement("span");
  taskText.textContent = taskInserita;
  lista.appendChild(taskText);

  const rimuovi = document.createElement("button");
  rimuovi.textContent = "🗑️";
  rimuovi.classList.add("delete");
  lista.appendChild(rimuovi);

  const completa = document.createElement("button");
  completa.textContent = "✔️";
  completa.classList.add("complete");
  lista.appendChild(completa);

  taskList.appendChild(lista);
  updateCounter();
}

// Gestione degli eventi per la lista delle task
taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    const lista = button.parentElement;

    if (button.classList.contains("delete")) {
      lista.classList.add("removing");
      setTimeout(() => {
        lista.remove();
        updateCounter();
      }, 300);
    } else if (button.classList.contains("complete")) {
      lista.classList.toggle("completata");
      console.log("Task completata");
      updateCounter();
    }
  }
});

// Funzione per aggiornare il contatore delle task
function updateCounter() {
  const tasks = taskList.querySelectorAll(".taskItem");
  const completedTasks = taskList.querySelectorAll(".taskItem.completata");

  counter.textContent = `Totale attività: ${tasks.length} | Completate: ${completedTasks.length}`;
}

// Gestione degli eventi per il pulsante "Rimuovi tutte le attività"
removeAllButton.addEventListener("click", function () {
  taskList.innerHTML = "";
  updateCounter();
});
