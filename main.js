//유저가 값을 입력한다
//+버튼을 클릭하면, 할일이 추가된다.
//delete버튼 누르면 할일이 삭제된다.
//check버튼 누르면 할일이 끝나면서 밑줄이 간다.
//1. check버튼을 클릭하는 순간 true->false
//2. true이면 끝난걸로 간주하고 밑줄 보여주기
//3. false이면 안끝난걸로 간주하고 그대로

//진행중 끝남 탭을 누르면, 언더바가 이동한다.
//끝남탭은 끝난 아이템만, 진행중탭은 진행중인 아이템만.
//전체탭을 누르면 다시 전체아이템으로 돌아옴.
//모바일 버전에서도 확인할 수 있는 반응형 웹이다

let taskInput=document.getElementById("task-input");
let addButton=document.getElementById("add-button");
let tabs=document.querySelectorAll(".task-tabs div")
let taskList=[];
let mode='all';
let filterList=[];
let underLine=document.getElementById("under-line");
let Menus=document.querySelectorAll(".task-tabs div:not(#under-line)");

addButton.addEventListener("click",addTask);

taskInput.addEventListener("keydown",function(event){
    if(event.key==="Enter"){
        addTask();
    }
});

Menus.forEach(menu=>menu.addEventListener("click",(e)=>Indicator(e)));

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);
    });
}

function addTask(){
    // 입력값 검사
    if(taskInput.value.trim() === ""){
        alert("할 일을 입력해주세요!");
        return;
    }

    let task={
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    };
    taskList.push(task);
    console.log(taskList);
    render();

    //입력창 비우기
    taskInput.value="";
}

function render(){
    //1. 내가 선택한 탭에 따라서
    let list=[];
    if(mode==="all"){
        list=taskList;
    }else if(mode==="ongoing"){
        list=taskList.filter(task => !task.isComplete);
    }else if(mode==="done"){
        list=taskList.filter(task => task.isComplete);
    }
    //2. 리스트를 달리 보여준다
    let resultHTML='';
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete==true){
            resultHTML+=`
        <div class="task task-done">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-undo-alt"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>`
        }else{
            resultHTML+=`
        <div class="task">
            <span>${list[i].taskContent}</span>
            <div class="button-box">
              <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
              <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>`
        }
    }
    document.getElementById("task-board").innerHTML=resultHTML;
}

function toggleComplete(id){

    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList[i].isComplete=!taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function filter(event){
    mode=event.target.id
    filterList=[];
    if(mode==="all"){
        //전체 리스트를 보여준다
        render();
    }else if(mode==="ongoing"){
        //진행중인 아이템을 보여준다.
        //task.isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===false){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("진행중",filterList);
    }else if(mode==="done"){
        //끝나는 케이스
        //task.isComplete=true;
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete===true){
                filterList.push(taskList[i]);
            }
        }
        render();
        console.log("끝남",filterList);
    }
}

function randomIDGenerate(){
    return Math.random().toString(36).substr(2, 16);
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id==id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
    console.log(taskList);
}

function Indicator(e){
    underLine.style.left=e.currentTarget.offsetLeft+"px";
    underLine.style.width=e.currentTarget.offsetWidth+"px";
    underLine.style.top=e.currentTarget.offsetTop+e.currentTarget.offsetHeight+"px";
}
