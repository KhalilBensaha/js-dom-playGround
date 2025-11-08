
const el = selector => document.querySelector(selector);
const logEl = el('#log');
function log(msg){
  const p = document.createElement('div');
  p.textContent = `${new Date().toLocaleTimeString()} — ${msg}`;
  logEl.prepend(p);
}

// Add items
const addForm = el('#addForm');
const newItem = el('#newItem');
const items = el('#items');
addForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = newItem.value.trim();
  if(!text) return;
  const li = document.createElement('li');
  li.className = 'item';
  li.innerHTML = `${escapeHtml(text)} <button class="remove">✕</button>`;
  items.prepend(li);
  newItem.value = '';
  log(`Added item: ${text}`);
});

// Remove 
items.addEventListener('click', e => {
  if(e.target.classList.contains('remove')){
    const li = e.target.closest('li');
    if(li){
      log(`Removed item: ${li.textContent.replace('✕','').trim()}`);
      li.remove();
    }
  }
});

// Clear all
el('#clear').addEventListener('click', () => {
  items.innerHTML = '';
  log('Cleared all items');
});

// Search filter
el('#search').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  Array.from(items.children).forEach(li => {
    const match = li.textContent.toLowerCase().includes(q);
    li.style.display = match ? '' : 'none';
  });
});

// Counter
let count = 0;
const countEl = el('#count');
el('#inc').addEventListener('click', () => { count++; updateCount(); log(`Count -> ${count}`); });
el('#dec').addEventListener('click', () => { count--; updateCount(); log(`Count -> ${count}`); });
function updateCount(){ countEl.textContent = count; }

// Theme toggle
el('#toggleTheme').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  log('Toggled theme');
});

// Small helper to avoid innerHTML injection from user input
function escapeHtml(str){
  const span = document.createElement('span');
  span.textContent = str;
  return span.innerHTML;
}

// Initial log
log('DOM Playground ready');
updateCount();

// Simple keyboard shortcut: focus add input with "a"
document.addEventListener('keydown', e => {
  if(e.key === 'a' && document.activeElement.tagName !== 'INPUT'){
    newItem.focus();
    e.preventDefault();
    log('Focused add input (shortcut: a)');
  }
});
