import React,{useEffect, useState} from "react";
import "./App.css"

function App() {
  const [InputValue,setInputValue] = useState('')
  const [TodoList,setTodoList] = useState([]);
  const [load,setLoad] = useState(0)
  const [undone,setUndone] = useState([])
  
  useEffect(()=> {undonelist()},[TodoList])

  useEffect(()=> {
    setTodoList([...TodoList])
  },[load])

  const undonelist = () => {
    setUndone(TodoList.filter((item) => item.className !== true))
  }


  const Ocean = (e) => {
    
    for(let i=0; i<TodoList.length; i++){
      if(TodoList[i].id === Number(e.target.id)){
        TodoList[i].className = (TodoList[i].className === true ? false : true)
      }
    }
    if(load===0){
      setLoad(1)
    }else if(load===1){
      setLoad(0)
    }
  }

  const onRemove = (e) => {
    const RemoveList = TodoList.filter((list) => Number(e.target.id) !== list.id);
    setTodoList(RemoveList);
  }

  const  addItem =() => {
    
    let op0 = 1
    if(TodoList.length >= 1) {
      op0 = TodoList[TodoList.length-1].id+1
    }
    
    setTodoList([
      ...TodoList,
      {id:op0,name:InputValue,className:false},
    ])
    setInputValue('')
  }

  const EnterKey = (e) => {
    if(e.key === 'Enter') {
      addItem()
    }
  };
  
  const Reset0 =() =>{
    setTodoList([])
  };
  
  return(
    <div>
      <header>
        <h1>Todo-List!</h1>
        <div>현재 <b>{undone.length}</b> 개의 할일이 있습니다.</div>
        <h2>
          <button className="button-Reset" onClick={Reset0}>Reset</button>
          <input
            value={InputValue}
            type={"text"}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={EnterKey}>
          </input>
          <button className="button-Enter" onClick={addItem}>↵ </button>
        </h2>
      </header>
        <div>
            {TodoList.map((item) => 
            <>
              <div className = {item.className === true ? "true-name" : "false-name"}>
                <button className="button-Remove" id={item.id} onClick={onRemove}>Remove</button>
                {item.name}
                <button className="button-Ocean" id={item.id} onClick={Ocean}>Done</button>
                </div>
                
              </>
            )}
        </div>
    </div>
  );
}
export default App;