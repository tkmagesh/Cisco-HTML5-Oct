function NotesStorage(){
	this.store = window.localStorage;
	this.whoAreYou = function(){
		return "I am notes storage";
	}
}	
NotesStorage.prototype.addNote = function (note){
	var newNoteId = new Date().getTime().toString();
	this.store.setItem(newNoteId,note);
	return {id : newNoteId,note : note}; 
};

NotesStorage.prototype.getAllNotes = function (){
		var result = [];
		var noteCount = this.store.length;
		for(var i=0;i<noteCount;i++){
			var noteId = this.store.key(i);
			var note = this.store.getItem(noteId);
			var noteObj = {id : noteId,note : note};
			result.push(noteObj);
		}
		return result;
	};