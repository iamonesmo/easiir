// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".select button");
const todoList = document.querySelector(".todoList");
const selectBox = document.querySelector("#priorityBox");
const deleteAllBtn = document.querySelector(".footer button");
const lowPriorityBtn = document.querySelector("#low");
const midPriorityBtn = document.querySelector("#mid");
const highPriorityBtn = document.querySelector("#high");
const showAllBtn= document.querySelector("#showAll");




var checkFilter = 'none';

//todo list item
 var todoItem = {
   todo: '',
   priority: ''
 }




 

// onkeyup event
inputBox.onkeyup =() =>{
  selectBox.selectedIndex = 0;
}

selectBox.onchange = ()=>{
  let userEnteredValue = inputBox.value;
  // let selectedPriority = selectBox.options[selectBox.selectedIndex].value; //getting user entered value
  if((userEnteredValue.trim() != 0) && (selectBox.selectedIndex != 0) ){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //activate the add button
   
    
  }else{
    addBtn.classList.remove("active"); //disable the add button
    
  }
}


//calling showAllfunction
showAll(); 


//clicking on Add button
addBtn.onclick = ()=>{ //when user clicks on plus icon button
  let userEnteredValue = inputBox.value;
  let selectedPriority = selectBox.options[selectBox.selectedIndex].value;

  //creating the todo from the entered values

  todoItem['todo'] = userEnteredValue;
  todoItem['priority'] = selectedPriority;

   //getting inputfield value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
   let listArray = []; //create a blank array
  }else{
    let listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  
   //pushing or adding new value in array
  listArray.push(todoItem);
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  
  
  addBtn.classList.remove("active"); 
  selectBox.selectedIndex = 0;//unactive the add button once the task added

   //calling show function
  if(checkFilter == 'none'){
    showAll();
  } else{
    show();
  }
}


//showAll function
function showAll(){

  let getLocalStorageData = localStorage.getItem("New Todo");

  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }

  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask

  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //activate the clear and filter buttons
    highPriorityBtn.classList.add("active")
    lowPriorityBtn.classList.add("active")
    midPriorityBtn.classList.add("active")
    showAllBtn.classList.add("active")
  }else{
    deleteAllBtn.classList.remove("active"); //deactivate the clear and filter buttons
    highPriorityBtn.classList.remove("active")
    lowPriorityBtn.classList.remove("active")
    midPriorityBtn.classList.remove("active")
    showAllBtn.classList.remove("active")
  }

  let newLiTag = "";
  listArray.forEach((element, index) => {
    
    if(element['priority'] == 'low'){
       newLiTag += `<li id = "low" >${element['todo']}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    } else if(element['priority'] == 'mid'){
      newLiTag += `<li id = "mid" >${element['todo']}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    }else{
      newLiTag += `<li id = "high" >${element['todo']}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    }


  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; 
  //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
 
  //  call a show function
   if(checkFilter == 'none'){
    showAll();
  } else{
    show();
  }
  
}
// delete all tasks function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showAll(); //call the showTasks function
}


 
function show(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask

  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //activate the clear and filter buttons
    highPriorityBtn.classList.add("active")
    lowPriorityBtn.classList.add("active")
    midPriorityBtn.classList.add("active")
    showAllBtn.classList.add("active")
  }else{
    deleteAllBtn.classList.remove("active"); //deactivate the clear and filter buttons
    highPriorityBtn.classList.remove("active")
    lowPriorityBtn.classList.remove("active")
    midPriorityBtn.classList.remove("active")
    showAllBtn.classList.remove("active")
  }

  let newLiTag = "";
  listArray.forEach((element, index) => {
    if(checkFilter!='none'){if(element['priority'] == checkFilter){
      newLiTag += `<li id = "${checkFilter}" >${element['todo']}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
   }}else{
     showAll();
   }
    
  
  }); 
  inputBox.value = ""; 

  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag

}

lowPriorityBtn.onclick = ()=>{
  checkFilter = 'low';
  show();
}
midPriorityBtn.onclick = () =>{
  checkFilter = 'mid';
  show();
}
highPriorityBtn.onclick = () =>{
  checkFilter = 'high'
  show();

}

showAllBtn.onclick = ()=>{
  showAll();
}