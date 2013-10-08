(function(){
	var storage = new NotesStorage();
	window.addEventListener("DOMContentLoaded",initialize);
	var txtNote,
		ulNotes;
	
	window.addEventListener("storage",function(storageEvt){
		if (!storageEvt.oldValue && storageEvt.newValue){
			var newNote = {id : storageEvt.key, note : storageEvt.newValue};
			addNoteToList(newNote);
		}
	});

	function initialize(){
		document.getElementById("btnAddNote").addEventListener("click",onBtnAddNoteClick);
		txtNote = document.getElementById("txtNote");
		ulNotes = document.getElementById("ulNotes");
		loadNotesFromStorage();
	}

	function loadNotesFromStorage(){
		var notes = storage.getAllNotes();
		for(var i=0;i<notes.length;i++){
			addNoteToList(notes[i]);
		}
	}
	
	function onBtnAddNoteClick(){	
		
		var note = txtNote.value;
		var newNote = storage.addNote(note);
		addNoteToList(newNote);
	}

	function addNoteToList(note){
		var newNote = document.createElement("li");
		newNote.innerHTML = note.note;
		ulNotes.appendChild(newNote);
	}
	
}());