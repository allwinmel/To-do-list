const inputBox = document.getElementById('input-Box');
const listcontainer = document.getElementById('list-container');

function addTask(){
    const task = inputBox.value.trim();
    if(task === ''){
        alert("Please enter a task!");
    }
    else{
        const li = document.createElement('li');
        li.textContent = task;
        listcontainer.appendChild(li);
        inputBox.value = "";
        saveData();
        const span = document.createElement("span");
        span.textContent = '\u00d7';
        li.appendChild(span);
        span.addEventListener("click", function(){
            li.remove();
            saveData();
            showTask();
        });
    }
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        showTask();
    }
}, false);

function saveData() {
    const data = [];
    const listItems = listcontainer.getElementsByTagName('li');
    for(let i = 0; i < listItems.length; i++){
        data.push(listItems[i].textContent);
    }
    localStorage.setItem("data", JSON.stringify(data));
}

function showTask() {
    const data = JSON.parse(localStorage.getItem("data") || "[]");
    listcontainer.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        const li = document.createElement('li');
        li.textContent = data[i];
        listcontainer.appendChild(li);
        const span = document.createElement("span");
        span.textContent = '\u00d7';
        li.appendChild(span);
        span.addEventListener("click", function(){
            this.parentNode.remove();
            saveData();
            showTask();
        });
    }
}
showTask();

