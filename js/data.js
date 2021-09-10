/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntriesJSON = localStorage.getItem('js-local-storage');

if (previousEntriesJSON !== null) {
  data.entries = JSON.parse(previousEntriesJSON);
}

window.addEventListener('beforeunload', beforeUnload);

function beforeUnload(event) {
  var dataEntriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('js-local-storage', dataEntriesJSON);
}
