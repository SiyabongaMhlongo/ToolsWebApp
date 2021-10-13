
const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach(note => {
        addNewNote(note)
    })
}

addBtn.addEventListener('click', () => {
    addNewNote();
});

function addNewNote(text = ''){
    const note = document.createElement('div');
    note.classList.add('note')

    note.innerHTML = `
     <div class="note-container">
        <div class="tool-bar">
            <button class="edit" data-tooltip="Save/Edit" data-tooltip-location="top"><i class="bx bxs-edit-alt"></i></button>
            <button class="delete" data-tooltip="Delete" data-tooltip-location="top" ><i class="bx bxs-x-square"></i></button>
        </div>

       <div class="main-notes ${text ? '' : 'hidden'}"></div>
       <textarea class="${text ? 'hidden' : ''}"></textarea>
     </div>
    `;

const editBtn = note.querySelector('.edit');
const deleteBtn = note.querySelector('.delete');


//switch between main and textarea
const main = note.querySelector('.main-notes');
const textArea = note.querySelector('textarea');

textArea.value = text;
main.innerHTML = marked(text);

//toggle betweeen their hidden class
editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
})

deleteBtn.addEventListener('click', () => {
    note.remove();

    updateLS()
})

textArea.addEventListener('input', (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS()
})


    document.body.appendChild(note)
};


//local storage for data
 function updateLS() {
     const notesText = document.querySelectorAll('textarea');

     const notes = [];

     notesText.forEach(note => {
         notes.push(note.value);
     })

     localStorage.setItem('notes', JSON.stringify(notes));
}
