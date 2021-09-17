/* global data */
/* exported data */
var $photoimg = document.querySelector('#entry-img');
var $form = document.querySelector('#input-form');
var $noEntriesText = document.querySelector('#no-entries-text');
var $list = document.querySelector('ul');
var $viewElements = document.querySelectorAll('.view');
var $newButton = document.querySelector('#new-btn');
var $navEntries = document.querySelector('#navEntries');
var $titleField = document.querySelector('#title');
var $photoUrlField = document.querySelector('#photo');
var $notesField = document.querySelector('#notes');
var $formHeading = document.querySelector('h1');
var $ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', contentLoaded);
$photoUrlField.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
$newButton.addEventListener('click', handleViewNavigation);
$navEntries.addEventListener('click', handleViewNavigation);
$ul.addEventListener('click', handleEdit);

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

  if (data.editing === null) {
    $entry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift($entry);
    $list.prepend(renderEntry(data.entries[0]));
    $noEntriesText.classList.add('hidden');
  } else {
    $entry.entryId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if ($entry.entryId === data.entries[i].entryId) {
        data.entries[i] = $entry;
        var $li = document.querySelectorAll('li');
        for (var j = 0; j < $li.length; j++) {
          if ($entry.entryId === parseInt($li[j].getAttribute('data-entry-id'))) {
            $li[j].replaceWith(renderEntry($entry));
          }
        }
        data.editing = null;
      }
    }
  }
  switchView('entry-form');
  $form.reset();
  $photoimg.setAttribute('src', 'images/placeholder-image-square.jpg');
}

function renderEntry(entry) {
  var li = document.createElement('li');
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
  editIcon.setAttribute('class', 'fas fa-pen purple');
  li.setAttribute('data-entry-id', entry.entryId);

  h2.textContent = entry.title;
  p.textContent = entry.notes;

  li.append(divRow);
  divRow.append(divColFullColHalf, divColFullColHalf2);
  divRow2.append(h2, editIcon);
  divRow3.append(p);
  divColFullColHalf.append(img);
  divColFullColHalf2.append(divRow2, divRow3);

  return li;
}

function handleEdit(event) {
  if (event.target.className === 'fas fa-pen purple') {
    for (var i = 0; i < data.entries.length; i++) {
      if (JSON.stringify(data.entries[i].entryId) === event.target.closest('li').getAttribute('data-entry-id')) {
        data.editing = data.entries[i];
      }
    }
    switchView('entries');
    $formHeading.textContent = 'Edit Entry';
    $photoimg.setAttribute('src', data.editing.photo);
    $photoUrlField.value = data.editing.photo;
    $titleField.value = data.editing.title;
    $notesField.value = data.editing.notes;
  }
}
