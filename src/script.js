fetch('http://demo.sibers.com/users') //  Create a request for our URL to get the JSON data
  .then(function(response) {
    // alert(response.headers.get('Content-Type')); // application/json; charset=utf-8  // used for debugging
    // alert(response.status); // 200   //  used for debugging
    return response.json();
   })
  .then(function(user) {
    localStorage.setItem('book', JSON.stringify(user)); //  convert JSON object to a string for saving it into LocalStorage
  })
  .catch( alert );

let contactsJSON = JSON.parse(localStorage.getItem('book')); //  convert LocalStorage object book into JS Object for working with them
let contactsTable = document.getElementById('contactsTable');

if (contactsJSON) { //  if the contactsJSON (LocalStorage) have items we run the code
  contactsJSON.sort(function(a, b) {  //  run function wich sort the array from JSON alphabetically
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
}

function showContacts() { // fill the table with data from LocalStorage 
  contactsTable.innerHTML = ""; //  delete all data from the table

  if (contactsJSON) { //  if the contactsJSON (LocalStorage) have items we run sort
    contactsJSON.sort(function(a, b) {  //  run function wich sort the array from JSON alphabetically
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    for (let i = 0; i < contactsJSON.length; i++) { //  select each cell of the table and fill them
      let createTableElement = document.createElement("tr"); 
      createTableElement.innerHTML = `  
        <td onClick="clickContact(event)" id="name${[i]}" class="name${[i]}">${contactsJSON[i].name}</td>
        <td onClick="clickContact(event)" id="userName${[i]}" class="name${[i]}">${contactsJSON[i].username}</td>
        <td onClick="clickContact(event)" id="email${[i]}" class="name${[i]}">${contactsJSON[i].email}</td>
        <td onClick="clickContact(event)" id="address${[i]}" class="name${[i]}">${contactsJSON[i].address.streetA}</td>
        <td><a onClick="clickEditButton(event)" id="editButton" class="btn ${[i]}">Редактировать</a></td>
        <td><a onClick="clickDeleteButton(event)" id="deleteButton" class="btn ${[i]}">Удалить</a></td>        
      `;  //  add the data from LocalStorage in the table. When we click on any cell, we run function clickContact(event) 
      // each row is assigned the same class
      contactsTable.appendChild(createTableElement);  //  add item to the table on screen
    }
  } else {  //  if the contactsJSON (LocalStorage) have no items we run this code
    let createTableElement = document.createElement("tr");
    createTableElement.innerHTML = "<td><i>Список контактов пуст</i></td>"; //  if the list have not items, then we will display this message
  }
}

showContacts(); // run function and fill the table

function clickContact(event) {  // if user click a table cell, we run this function
  let userNameClassName = event.target.className.substring(4);  //  write the line number on which clicked and cut off the excess
  let editDeleteButtons = document.getElementsByClassName(userNameClassName); //  select the delete and edit buttons with the appropriate class for further work with them
  let allButtons = document.getElementsByClassName("btn");  //  select all buttons whis class "btn"

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.display = "none"; //  hide all "edit" and "delete" buttons
    document.getElementById("editTable").style.display = "none";  //  hide the edit table
  }

  if (editDeleteButtons) {
    for (let i = 0; i < editDeleteButtons.length; i++) {
      editDeleteButtons[i].removeAttribute("id"); //  for all "edit", "delete" buttons with appropriate class remove id and show it
      editDeleteButtons[i].style.display = "";
    }
  }
}

function clickEditButton(event) { //  if we click on the edit button, run this code
  let allButtons = document.getElementsByClassName("btn");  //  select all buttons whis class "btn"

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.display = "none"; //  hide all "edit" and "delete" buttons with class 'btn' 
    document.getElementById("editTable").style.display = "none";  //  hide the edit table 
  }
    
    document.getElementById("editTable").style.display = "block"; //  add on the screen edit table
    let userNameClassName = event.target.className.substring(4);  //  select the line number on which clicked and cut off the excess
    let inputName = document.getElementById("inputName");
    let inputLogin = document.getElementById("inputLogin");
    let inputEmail = document.getElementById("inputEmail");
    let inputAddress = document.getElementById("inputAddress");
    
    inputName.value = `${contactsJSON[userNameClassName].name}`;  //  assign input lines to the required table row values 
    inputLogin.value = `${contactsJSON[userNameClassName].username}`;
    inputEmail.value = `${contactsJSON[userNameClassName].email}`;
    inputAddress.value = `${contactsJSON[userNameClassName].address.streetA}`;
    inputName.className = userNameClassName;  //  assign the required class to the input (depending on the selected row)
    inputLogin.className = userNameClassName;
    inputEmail.className = userNameClassName;
    inputAddress.className = userNameClassName;
    document.getElementById("saveBtn").className = userNameClassName; //  assign the required class to the button "save"
}

function saveChanges(event) { //  if we click on the "save" button in edit table, run this code
  let contactItemNumber = event.target.className; //  save the line number on which clicked 
  let inputName = document.getElementById("inputName");
  let inputUserName = document.getElementById("inputLogin");
  let inputEmail = document.getElementById("inputEmail");
  let inputAddress = document.getElementById("inputAddress");

  let concatName = "name" + contactItemNumber;  //  concatenate the string class name and line number to search for the result item by id
  let concatUserName = "userName" + contactItemNumber;
  let concatEmail = "email" + contactItemNumber;
  let concatAddress = "address" + contactItemNumber;

  document.getElementById(concatName).innerHTML = inputName.value;  //  look for the desired row in the table and asign them input value
  document.getElementById(concatUserName).innerHTML = inputUserName.value;
  document.getElementById(concatEmail).innerHTML = inputEmail.value;
  document.getElementById(concatAddress).innerHTML = inputAddress.value;

  function saveToLocalStorage() { //  if we click button "save", run this code
    var serialObj = JSON.stringify(contactsTable.innerHTML);  //  we need serialize all data in the table in the string, for save in LocalStorage
    localStorage.setItem('book2', serialObj); //  save data in localStorage with name "book2"
  }
  saveToLocalStorage();
}

function clickDeleteButton(event) { //  if we click delete buttons, run this code
  let allButtons = document.getElementsByClassName("btn");  //  select all buttons with id "btn"
  let contactItemNumber = event.target.className.substring(4);  //  select the line number on which clicked and and cut off the excess  

  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.display = "none"; //  hide all "edit" and "delete" buttons with class 'btn'
    document.getElementById("editTable").style.display = "none";  // hide the edit table
  }

  let concatName = "name" + contactItemNumber;  //  concatenate the string class name and line number to search for the result item by id
  let concatUserName = "userName" + contactItemNumber;
  let concatEmail = "email" + contactItemNumber;
  let concatAddress = "address" + contactItemNumber;

  document.getElementById(concatName).innerHTML = ""; //  look for the desired row in the table and delete all data
  document.getElementById(concatUserName).innerHTML = "";
  document.getElementById(concatEmail).innerHTML = "";
  document.getElementById(concatAddress).innerHTML = "  ";
}