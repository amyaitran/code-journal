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

// DOM tree
// <div class="row">
//   <div class="column-full column-half">
//     <img src="images/placeholder-image-square.jpg">
//   </div>

//   <div class="column-full column-half">
//     <div class="row">
//       <h2 class="mb-0">Title</h2>
//     </div>

//     <div class="row">
//       <p>Notes Lorem ipsum </p>
//     </div>
//   </div>

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
  img.setAttribute('src', data.entries[i].photo);
  h2.setAttribute('class', 'mb-0');

  h2.textContent = data.entries[i].title;
  p.textContent = data.entries[i].notes;

  // h2.textContent = data.entries.title;
  // p.textContent = data.entries.notes;

  divRow.appendChild(divColFullColHalf);
  divColFullColHalf.appendChild(img);
  divRow.appendChild(divColFullColHalf2);
  divColFullColHalf2.appendChild(divRow2);
  divRow2.appendChild(h2);
  divColFullColHalf2.appendChild(divRow3);
  divRow3.appendChild(p);

  return divRow;
}

var $list = document.querySelector('ul');

for (var i = 0; i < data.entries.length; i++) {
  $list.appendChild(renderEntry(data.entries[i]));
  // console.log('data entries', data.entries);
  // console.log('data entries title', data.entries[i].title);
}
