// an array of todo lists of todo objects
// side bar with categories like (today, this week, etc.)
// double click on one to get more details (insert a div?)

import "./styles.css";
import { printList } from "./printer.js";
import { format } from "date-fns";

function Todo (title, description, date) {
    this.title = title;
    this.description = description;
    this.dueDate = date;
    this.priority = 1;
    this.notes = '';
    this.completed = false;
    this.category = '';
}
let activeList = [];
const todos = [ activeList ];

// read from saved lists

if (activeList.length==0){
    activeList = [
        new Todo('new item', 'a new item with a default description', '01-Dec-2024'),
        new Todo(' 2nd item', 'description','01-Nov-2024')
    ]
}
const debug = document.getElementById("debugBtn");
debug.addEventListener("click", printState);

const sortDate = document.getElementById("sortdate");

const todayItems = document.getElementById("filtertoday");
todayItems.addEventListener("click", getTodayItems);

const thisWeek = document.getElementById("filterweek");
thisWeek.addEventListener("click", getThisWeekItems);

const thisMonth = document.getElementById("filtermonth");
thisMonth.addEventListener("click", getThisMonthItems);

// set up the page
printList(activeList);

function addList(list) {
    todos.push(list);
    printList(activeList);
}

function removeList (index){
    todos.splice(index, 1);
    printList(activeList);
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