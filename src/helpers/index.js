export function addTodoListToLocalStorage(notes, userAction=false){
    if(!notes.length && !userAction)
        return
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function getTodoListFromLocalStorage(){
    return JSON.parse(localStorage.getItem("notes")) || [];
}