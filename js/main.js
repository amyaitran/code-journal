/* global data */
/* exported data */

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
  var $entry = { title, photo, notes };
  $entry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift($entry);
  $photoimg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}
