/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $entry;
var $photoimg = document.querySelector('#entry-img');
var $photoURL = document.querySelector('#photo');
var $form = document.querySelector('#input-form');

$photoURL.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  $photoimg.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var title = event.target.title.value;
  var photo = event.target.photo.value;
  var notes = event.target.notes.value;
  $entry = { title, photo, notes };
  $entry.EntryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift($entry);
  $photoimg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

var previousEntriesJSON = localStorage.getItem('javascript-local-storage');

if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataEntriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', dataEntriesJSON);
}
