// Change text when button clicked
const btn = document.getElementById("btn");
const message = document.getElementById("message");

btn.addEventListener("click", () => {
  message.textContent = "You just changed this text with JavaScript!";
});

// Add new item to list
const addBtn = document.getElementById("addBtn");
const input = document.getElementById("input");
const list = document.getElementById("list");

addBtn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value) {
    const li = document.createElement("li");
    li.textContent = value;
    list.appendChild(li);
    input.value = "";
  }
});
