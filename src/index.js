// an array of todo lists of todo objects
// side bar with categories like (today, this week, etc.)
// double click on one to get more details (insert a div?)

import "./styles.css";
import { printList } from "./printer.js";
import { format } from "date-fns";
import { setup } from "./setup.js";

function Project (name, todos) {
    this.name = name;
    this.todos = todos;
}

function Todo (title, description, date) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = 1;
    this.notes = '';
    this.completed = false;
    this.category = '';
}

// TODO read from saved lists
// test data
const projects = [ new Project("new project", [new Todo('new item', 'a new item with a default description', '01-Dec-2024'),
                                            new Todo(' 2nd item', 'description','01-Nov-2024')]),
                new Project("2nd project", [new Todo ('2nd project item 1', '', '01-Jan-2025')])
];

let activeProject = projects[0];



// set up the page

const addTask = document.getElementById('newtask');
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

form.addEventListener("submit", (event) => {
     event.preventDefault(); // Prevent page reload

     activeProject.todos.push({title: inputField.value, description:'', dueDate:new Date()})
     printList(activeProject);
   });

addTask.appendChild(form);

printList(projects[0]);

function addList(list) {
    projects.push(new Project('new project', list));
    printList(activeProject);
}

function removeList (index){
    projects.splice(index, 1);
    printList(activeProject);
}

function getTodayItems(){
    const container = document.getElementById("list");
    
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    const filteredList = activeList.filter(item => {
        const dueDate = new Date(item.dueDate); // Convert string to Date
        return dueDate.getFullYear() === today.getFullYear() &&
           dueDate.getMonth() === today.getMonth() &&
           dueDate.getDate() === today.getDate();
    });
    
    console.log(filteredList.length);  
    printList(filteredList);
}

function getThisWeekItems() {
    const today = new Date();

    // Get the start of the current week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday of this week
    startOfWeek.setHours(0, 0, 0, 0);

    // Get the end of the current week (Saturday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // Saturday of this week
    endOfWeek.setHours(23, 59, 59, 999);

    // Filter and return items within this week
    let filteredList= activeList.filter(item => {
        const dueDate = new Date(item.dueDate); // Convert to Date object if not already
        return dueDate >= startOfWeek && dueDate <= endOfWeek;

    });

    printList(filteredList);   
}

function getThisMonthItems() {
    const today = new Date();

    // Get the current year and month
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0-based index (0 = January, 11 = December)

    // Filter and return items within this month
    let filteredList =  activeList.filter(item => {
        const dueDate = new Date(item.dueDate); // Convert to Date object if not already
        return dueDate.getFullYear() === currentYear && dueDate.getMonth() === currentMonth;
    });

    printList(filteredList);
}

function printState (){
    const debugContainer = document.getElementById("debug");

    for (let i = debugContainer.children.length-1; i>=0; i --){
        if (debugContainer.children[i].class==='message')
        debugContainer.removeChild(debugContainer.children[i]);
    }

    activeList.forEach((item)=>{
        const p = document.createElement("p");
        p.class = 'message';
        p.innerText= item.title + " | " + item.dueDate + " | "  + item.priority + " | " + item.completed;
        debugContainer.appendChild(p);
    });
}

const debug = document.getElementById("debugBtn");
debug.addEventListener("click", printState);

const sortDate = document.getElementById("sortdate");

const allItems = document.getElementById("all");
allItems.addEventListener("click", ()=> printList(activeList) );

const todayItems = document.getElementById("filtertoday");
todayItems.addEventListener("click", getTodayItems);

const thisWeek = document.getElementById("filterweek");
thisWeek.addEventListener("click", getThisWeekItems);

const thisMonth = document.getElementById("filtermonth");
thisMonth.addEventListener("click", getThisMonthItems);

const projectList = document.getElementById("projectList");
projects.forEach((item)=>{
    const button = document.createElement('button');
    button.id =item.name;
    button.innerText=item.name;
    button.addEventListener('click', ()=>printList(item));
    projectList.appendChild(button);
});