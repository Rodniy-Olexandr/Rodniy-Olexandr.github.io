var monthNumber = ["01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12"
];
var todoList = [];
var data = new Date();
var day = data.getDate();
var monthIndex = data.getMonth();
var year = data.getFullYear(); 
 
function add() {

  if(document.getElementById('task').value == ""){
    alert("The value field is empty.");
  }else {
    var task = document.getElementById('task').value; 
    var dolist = todoList;
    dolist.push({
      value: task,
      date: day + "." +monthNumber[monthIndex] + "." + year 
    });
    localStorage.setItem('list_l', JSON.stringify(dolist));
    console.log(todoList)
    show();
    document.getElementById('task').value = "";
  }
    return false;
}
function pressEnter(event){
   var eventValue = event.which || event.keyCode;
   if(eventValue == 13){
    add();
   }
}
function get_list() {
    var dolist = new Array;
    var dolist_str = localStorage.getItem('list_l');
    if (dolist_str !== null) {
        dolist = JSON.parse(dolist_str); 
    }
    return dolist;
}
function show() {
    var dolist = todoList;
    console.log(dolist)
 
    var html = '<ul>';
    for(var i=0; i<dolist.length; i++) {
        html += '<li>' + '<h2>' + dolist[i].value + '</h2>' + '<span class="date">' + dolist[i].date +'</span>' + '<button class="upb" id="'+ i +'">\u2191</button>' + '<button class="downb" id="'+ i +'">\u2193</button>' +'<button class="remove" id="' + i + '">\Х</button></li>';
    };
    html += '</ul>';
    document.getElementById('dolist').innerHTML = html;
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);};
    var liUp = document.getElementsByClassName('upb');
    var liDown = document.getElementsByClassName('downb');  
    for(var j = 0; j < liUp.length; j++){
      liUp[j].addEventListener('click', Up);}
    for(var k = 0; k < liDown.length; k++){
      liDown[k].addEventListener('click', Down);}
}
function Up(){
  var idUp = parseInt(this.getAttribute('id'));
    var temp;
    if(idUp > 0 && idUp < todoList.length){
      temp = todoList[idUp];
      todoList[idUp] = todoList[idUp-1];
      todoList[idUp-1] = temp;
      localStorage.setItem('list_l', JSON.stringify(todoList));
      show();
    }
}
function Down(){
  var idDown = parseInt(this.getAttribute('id'));
    var tempDown;
    if(idDown < todoList.length-1){
      tempDown = todoList[idDown];
      todoList[idDown] = todoList[idDown+1];
      todoList[idDown+1] = tempDown;
      localStorage.setItem('list_l', JSON.stringify(todoList));
      show();
    }
}

function remove() {
    var id = this.getAttribute('id');
    console.log(id)
    var dolist = todoList;
    dolist.splice(id, 1);
    localStorage.setItem('list_l', JSON.stringify(dolist));
    show();
    return false;
}
function search(){
  var input, filter, ul, li, a, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("dolist");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h2")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } 
        else {
            li[i].style.display = "none";
          }
    }
}
if(JSON.parse(localStorage.getItem('list_l')) != null){
    if(confirm("Restore the task list?")){
      todoList = get_list();
    }else{
      localStorage.clear();
      todoList = [];
    }   
  }
document.getElementById('add').addEventListener('click', add);
show();

