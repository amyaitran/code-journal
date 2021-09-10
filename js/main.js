/* global data */
/* exported data */

var $photoimg = document.querySelector('#entry-img');
var $photoURL = document.querySelector('#photo');
var $form = document.querySelector('#input-form');
var $entriesPage = document.querySelector('#entries-page');
var $entriesFormPage = document.querySelector('#entry-form');
var $noEntriesText = document.querySelector('#no-entries-text');
var $list = document.querySelector('ul');
var $viewElements = document.querySelectorAll('.view');

$photoURL.addEventListener('input', handleInput);
$form.addEventListener('submit', handleSubmit);
window.addEventListener('DOMContentLoaded', contentLoaded);
window.addEventListener('click', switchView);

function contentLoaded(event) {
  if (data.entries.length !== 0) {
    $noEntriesText.className = 'hidden page column-full flex jc-center';
  } else {
    $noEntriesText.className = 'page column-full flex jc-center';
  }
  for (var i = 0; i < data.entries.length; i++) {
    $list.appendChild(renderEntry(data.entries[i]));
  }
}

function switchView(view) {
  var $dataView = event.target.getAttribute('data-view');
  for (var i = 0; i < $viewElements.length; i++) {
    if ($dataView === $viewElements[i].getAttribute('data-view')) {
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
  $entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift($entry);
  $photoimg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  $list.prepend(renderEntry(data.entries[0]));
  $entriesPage.className = 'page';
  $entriesFormPage.className = 'page hidden';
  $noEntriesText.className = 'hidden page column-full flex jc-center';
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

  divRow.setAttribute('class', 'row');
  divRow2.setAttribute('class', 'row');
  divRow3.setAttribute('class', 'row');
  divColFullColHalf.setAttribute('class', 'column-full column-half mb-2.8');
  divColFullColHalf2.setAttribute('class', 'column-full column-half mb-2.8');
  img.setAttribute('src', entry.photo);
  h2.setAttribute('class', 'mb-0');

  h2.textContent = entry.title;
  p.textContent = entry.notes;

  divRow.appendChild(divColFullColHalf);
  divColFullColHalf.appendChild(img);
  divRow.appendChild(divColFullColHalf2);
  divColFullColHalf2.appendChild(divRow2);
  divRow2.appendChild(h2);
  divColFullColHalf2.appendChild(divRow3);
  divRow3.appendChild(p);

  return divRow;
}
