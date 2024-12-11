import { format } from "date-fns";

function printList(project){

    const container = document.getElementById("list");
    container.innerHTML="";

    const table = document.createElement('table');

    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = [ 'title', 'dueDate', 'priority', 'completed', 'remove', 'details']
    
    headers.forEach(headerText=> {
        const headerCell = document.createElement('th');
        //headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    const tbody = table.createTBody();

    // add a table of items to the container
    for (let i =0; i < project.todos.length;i++){
        const row = tbody.insertRow();
        row.id = `row${i}`;
        for (let key of headers){
            const cell = row.insertCell();
            
            switch(key){
                case 'title':
                    const titleInput = document.createElement('input');
                    titleInput.type = 'text';
                    titleInput.textContent = project.todos[i].title;
                    titleInput.addEventListener("change", (event)=>{
                        project.todos[i].title = event.target.value;
                        
                    });
                    cell.appendChild(titleInput);
                    break;
                case 'remove':
                    const removeButton = document.createElement('button');
                    removeButton.textContent='X';
                    removeButton.onclick= function()
                    { 
                        removeItem(project.todos, i);
                        printList(project.todos);
                    }
                    cell.appendChild(removeButton);
                    break;
                case 'completed':
                    const doneCheckbox = document.createElement('input');
                    doneCheckbox.type = "checkbox";
                    doneCheckbox.addEventListener("change", (event)=>{
                        project.todos[i].completed = event.target.checked;
                        
                    });
                    
                    cell.appendChild(doneCheckbox);
                    break;
                case 'dueDate':
                    const calendar = document.createElement('input');
                    calendar.type = "date";
                    calendar.addEventListener("change", (event)=>{
                        project.todos[i].dueDate = event.target.value;
                    });
                    calendar.value = format(project.todos[i].dueDate, "yyyy-MM-dd");                  
                    cell.appendChild(calendar);
                    break;
                case 'priority':
                    const combobox = document.createElement('select')
                    combobox.name = 'priority';
                    combobox.addEventListener('input', (event)=>{
                        project.todos[i].priority = event.target.value;
                    });
                    for(let j = 1; j <= 5;j++){
                        const option = document.createElement('option');
                        option.value = j;
                        option.innerText = j;
                        combobox.appendChild(option);
                    }
                    cell.appendChild(combobox);
                    break;
                case 'details':
                    const button = document.createElement('button');
                    button.innerText='v';
                    button.addEventListener('click', ()=>{
                        showDetails(project.todos[i],i)
                    });
                    cell.appendChild(button);
                    break;
                default:
                    cell.textContent = project.todos[i][key];
                    break;
            }
        }        
    }

   

    container.appendChild(table);
}

function removeItem(activeList, index){
    activeList.splice(index, 1);
    printList(activeList);
}

function showDetails(item, index){
    const div = document.getElementById('details');
    div.innerHTML='';
    const p = document.createElement('p');
    p.innerText = item.description;
    div.appendChild(p);
    
    
}

export { printList }