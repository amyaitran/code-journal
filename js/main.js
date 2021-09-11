/* global data */
/* exported data */

var $photoimg = document.querySelector('#entry-img');
var $photoURL = document.querySelector('#photo');
var $form = document.querySelector('#input-form');
var $noEntriesText = document.querySelector('#no-entries-text');
var $list = document.querySelector('ul');
var $viewElements = document.querySelectorAll('.view');
var $newButton = document.querySelector('#new-btn');
var $navEntries = document.querySelector('#navEntries');
var $editTitle = document.querySelector('#title');
var $editNotes = document.querySelector('#notes');

$photoURL.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', contentLoaded);
$newButton.addEventListener('click', handleViewNavigation);
$navEntries.addEventListener('click', handleViewNavigation);

function contentLoaded(event) {
  if (data.entries.length !== 0) {
    $noEntriesText.classList.add('hidden');
  }
  for (var i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
}

function handleViewNavigation(event) {
  var targetView = event.target.getAttribute('data-view');
  switchView(targetView);
}

function switchView(view) {
  for (var i = 0; i < $viewElements.length; i++) {
    if (view !== $viewElements[i].getAttribute('data-view')) {
      $viewElements[i].className = 'view';
    } else {
      $viewElements[i].className = 'view hidden';
    }
  }
}

function handleInput(event) {
  $photoimg.setAttribute('src', event.target.value);
}

function handleSubmit(event) {
  event.preventDefault();
  var title = event.target.title.value;
  var photo = event.target.photo.value;
  var notes = event.target.notes.value;
  var $entry = { title, photo, notes };

  // if () {
  $entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift($entry);
  $photoimg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $list.prepend(renderEntry(data.entries[0]));
  $noEntriesText.classList.add('hidden');
  // }
  switchView('entry-form');
}

function renderEntry(entry) {
  var divRow = document.createElement('div');
  var divRow2 = document.createElement('div');
  var divRow3 = document.createElement('div');
  var divColFullColHalf = document.createElement('div');
  var divColFullColHalf2 = document.createElement('div');
  var img = document.createElement('img');
  var h2 = document.createElement('h2');
  var p = document.createElement('p');
  var editIcon = document.createElement('i');

  divRow.setAttribute('class', 'row');
  divRow2.setAttribute('class', 'row pos-rel');
  divRow3.setAttribute('class', 'row');
  divColFullColHalf.setAttribute('class', 'column-full column-half mb-2.8');
  divColFullColHalf2.setAttribute('class', 'column-full column-half mb-2.8');
  img.setAttribute('src', entry.photo);
  img.setAttribute('class', 'entry');
  h2.setAttribute('class', 'entry mb-0');
  editIcon.setAttribute('class', 'entry fas fa-pen purple pos-abs');

  img.setAttribute('data-entry-id', entry.entryId);
  h2.setAttribute('data-entry-id', entry.entryId);
  p.setAttribute('data-entry-id', entry.entryId);
  editIcon.setAttribute('data-entry-id', entry.entryId);
  divRow.setAttribute('data-entry-id', entry.entryId);

  h2.textContent = entry.title;
  p.textContent = entry.notes;

  divRow.appendChild(divColFullColHalf);
  divColFullColHalf.appendChild(img);
  divRow.appendChild(divColFullColHalf2);
  divColFullColHalf2.appendChild(divRow2);
  divRow2.appendChild(h2);
  divRow2.appendChild(editIcon);
  divColFullColHalf2.appendChild(divRow3);
  divRow3.appendChild(p);

  return divRow;
}

var $ul = document.querySelector('ul');
$ul.addEventListener('click', handleEdit);

function handleEdit(event) {
  if (event.target.getAttribute('class') === 'entry fas fa-pen purple pos-abs') {
    var $entryId = event.target.getAttribute('data-entry-id');
    switchView('entries');
    $photoimg.setAttribute('src', (data.entries[data.entries.length - $entryId].photo));
    $photoURL.value = data.entries[data.entries.length - $entryId].photo;
    $editTitle.value = data.entries[data.entries.length - $entryId].title;
    $editNotes.textContent = data.entries[data.entries.length - $entryId].notes;
  }
}
