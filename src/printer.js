import { format } from "date-fns";

function printList(activeList){

    const container = document.getElementById("list");
    container.innerHTML="";
    // if (activeList.length==0)
    //     return;

    const table = document.createElement('table');

    const header = table.createTHead();
    const headerRow = header.insertRow();
    const headers = [ 'title', 'dueDate', 'priority', 'completed', 'remove']
    
    headers.forEach(headerText=> {
        const headerCell = document.createElement('th');
        //headerCell.textContent = headerText;
        headerRow.appendChild(headerCell);
    });

    const tbody = table.createTBody();

    // add a table of items to the container
    for (let i =0; i < activeList.length;i++){
        const row = tbody.insertRow();
        for (let key of headers){
            const cell = row.insertCell();
            
            switch(key){
                case 'remove':
                    const removeButton = document.createElement('button');
                    removeButton.textContent='X';
                    removeButton.onclick= function()
                    { 
                        removeItem(activeList, i);
                        printList(activeList);
                    }
                    cell.appendChild(removeButton);
                    break;
                case 'completed':
                    const doneCheckbox = document.createElement('input');
                    doneCheckbox.type = "checkbox";
                    doneCheckbox.addEventListener("change", (event)=>{
                        activeList[i].completed = event.target.checked;
                        
                    });
                    
                    cell.appendChild(doneCheckbox);
                    break;
                case 'dueDate':
                    const calendar = document.createElement('input');
                    calendar.type = "date";
                    calendar.addEventListener("change", (event)=>{
                        activeList[i].dueDate = event.target.value;
                    });
                    calendar.value = format(activeList[i].dueDate, "yyyy-MM-dd");                  
                    cell.appendChild(calendar);
                    break;
                case 'priority':
                    const combobox = document.createElement('select')
                    combobox.name = 'priority';
                    combobox.addEventListener('input', (event)=>{
                        activeList[i].priority = event.target.value;
                    });
                    for(let j = 1; j <= 5;j++){
                        const option = document.createElement('option');
                        option.value = j;
                        option.innerText = j;
                        combobox.appendChild(option);
                    }
                    cell.appendChild(combobox);
                    break;
                default:
                    cell.textContent = activeList[i][key];
                    break;
            }
        }        
    }

    // add a row of inputs for a new item
    const row = tbody.insertRow();

    const form = document.createElement("form");
    form.id = "form";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "textInput";
    inputField.placeholder = "Enter text";
    form.appendChild(inputField);

    // Create submit button
    const submitButton = document.createElement("button");
    submitButton.type = "submit"; // Set button type to 'submit'
    submitButton.textContent = "Submit";
    form.appendChild(submitButton);

    const cell = row.insertCell();
    cell.colSpan = 2; // Merge cells if form spans both
    cell.appendChild(form);

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page reload

        activeList.push({title: inputField.value, description:'', dueDate:new Date()})
        printList(activeList);
      });

    container.appendChild(table);
}

function removeItem(activeList, index){
    activeList.splice(index, 1);
    printList(activeList);
}

export { printList }