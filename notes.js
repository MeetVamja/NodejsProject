const fs = require('fs')

const getNotes = ()=>{
    return 'Your Notes';
}
// Adding Notes
const addNote = (title , body)=>{
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (notes){
        return notes.title === title;
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body : body
        })
        saveNotes(notes);
        console.log("New Notes is Addes");
    }else{
        console.log('New title is taken');
    }

}

const saveNotes = (notes)=>{
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJson);
}
const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const datastring = dataBuffer.toString();
        return JSON.parse(datastring);
    }
    catch(e){
        return [];
    }
}

// Remove 
const removeNote = (title)=>{
    const notes = loadNotes();
    const notesToKeep = notes.filter(function (note){
        return note.title !==title
    });

    saveNotes(notesToKeep);
}
// List 
const listNotes =()=>{
    const notes = loadNotes();
    console.log('Your Notes');

    notes.forEach((note) => {
        console.log(note.title);
    });
}

const readNote = (title) =>{
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);
    if(note){
        console.log(note.title);
        console.log(note.body);
    }
    else{
        console.log("note does  not found ");
    }
}
module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
};