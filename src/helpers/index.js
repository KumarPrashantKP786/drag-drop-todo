export function addTodoListToLocalStorage(notes){
    notes.forEach(note => {
        const id =  'todo'+note.id;
        if(!localStorage.getItem(id)){
            localStorage.setItem(id, JSON.stringify(note));
        }
    });
}

export function getTodoListFromLocalStorage(){
    const localStorageKeys = Object.keys(localStorage);
    const notes = [];
    localStorageKeys.forEach(key => {
        if(key.includes('todo')){
            const todo = JSON.parse(localStorage.getItem(key));
            notes.push(todo)
        }
    })
    console.log(notes)
    return notes;
}