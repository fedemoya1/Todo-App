import { useState, useEffect } from 'react'
import sun from './assets/icon-sun.svg'
import moon from './assets/icon-moon.svg'
import './App.css'
import iconCheck from './assets/icon-check.svg'
import iconDelete from './assets/icon-cross.svg'

function App() {
  
  const [theme, setTheme] = useState(false);
  
  const [inputValue, setInputValue] = useState('');

  const [todo, setTodo] = useState([{
    activity:"Complete online JavaScript course",
    isCompleted:true
  },
  {
    activity:"Jog around the park 3x",
    isCompleted:false
  },
  {
    activity:"10 minutes meditation",
    isCompleted:false
  },
  {
    activity:"Read for 1 hour",
    isCompleted:false
  },
  {
    activity:"Pick up groceries",
    isCompleted:false
  },
  {
    activity:"Complete Todo App on Frontend Mentor",
    isCompleted:false
  }]);

  const [itemsLeft, setItemsLeft] = useState(todo.length)
  const [select, setSelect] = useState(0);

  useEffect(() =>{
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
     setTodo(storedTodos);
     setItemsLeft(storedTodos);
    }
  },[])

  useEffect(() => {
    let uncheckedItems = todo.filter(todo => {
      return todo.isCompleted != true;
    })
    setItemsLeft(uncheckedItems.length)
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo])

  useEffect(() =>{
    document.body.style.backgroundColor = theme ? "hsl(235, 21%, 11%)" : "hsl(236, 33%, 92%)";
    theme ? document.body.classList.add('dark-body') : document.body.classList.add('light-body');
    theme ? document.body.classList.remove('light-body') : document.body.classList.remove('dark-body');

  },[theme])

  function deleteTodo(index){
    const updateTodo = [...todo];
    updateTodo.splice(index, 1);
    setTodo(updateTodo);
  }

  function toggleTodo(index){
    const updateTodo = [...todo];
    updateTodo[index].isCompleted = !updateTodo[index].isCompleted;
    setTodo(updateTodo);
  }

  function clearCompleted () {
    setTodo(prev => {
      return prev.filter(todo => todo.isCompleted != true)
    })
  }

  function arrayTodo(){

    return todo.map((obj, index) =>{
      
      const showTodo = select === 0 ? 'single-todo' : 
      select === 1 & obj.isCompleted === false ? 'single-todo' :
      select === 2 & obj.isCompleted === true ? 'single-todo' : 'none';

      return (
      <div className={`${showTodo} ${theme ? "dark-single-todo" : "light-single-todo"} ${obj.isCompleted ? "completed" : ""}`} key={index}>
        <div className="sub-todo">
          <picture className={`circle-check ${theme ? "dark-circle-check" : "light-circle-check"} ${obj.isCompleted ? 'rainbow' : ''}`} onClick={()=>toggleTodo(index)}>
            {
              obj.isCompleted ?  
              <img src={iconCheck} alt="check icon"/> : ''
            }
          </picture>
          <span>{obj.activity}</span>
        </div>
          <img src={iconDelete} alt="delete icon" onClick={()=>deleteTodo(index)}/>
      </div>)
    })
}

  function addTodo(e){
    e.preventDefault();
    const newTodo = {
      activity: inputValue,
      isCompleted: false,
    }
    setTodo(prev => [newTodo, ...prev])
    setInputValue('');
    setSelect(0);
  }

  return (
    <>
      <div className='container'>
        <div className="header">
          <h1 className="title">TODO</h1>
          <img 
            src={theme ? sun : moon} 
            alt={`${theme ? "sun" : "moon"}`}
            onClick={() => setTheme(prev => !prev)} 
          />
        </div>

        <div className={`input-box`}>
          <form onSubmit={(e)=>addTodo(e)}>
            <input 
              value={inputValue} 
              onChange={e => setInputValue(e.target.value)}
              placeholder="Create a new todo..."
              className={`${theme ? "dark-input-box" : "light-input-box"}`} 
            />
          </form>
          <div className='circle'>
          </div>
        </div>

        <div className={`todos ${theme ? "dark-todos" : "light-todos"}`}>
          {arrayTodo()}
          <div className="menu">
            <span>{itemsLeft} items left</span>
            <div className="inner-menu">
              <span onClick={()=>setSelect(0)} className={`${select === 0 ? "active" : ""}`}>
                All
              </span>
              <span onClick={()=>setSelect(1)} className={`${select === 1 ? "active" : ""}`}>
                Active
              </span>
              <span onClick={()=>setSelect(2)} className={`${select === 2 ? "active" : ""}`}>
                Completed
              </span>
            </div>
            <span onClick={()=>clearCompleted()} className="clear-complete">Clear Completed</span>
          </div>
        </div>

        <div className={`${theme ? "dark-out" : "light-out"}`}>
          <span onClick={()=>setSelect(0)} className={`${select === 0 ? "active" : ""}`}>
            All
          </span>
          <span onClick={()=>setSelect(1)} className={`${select === 1 ? "active" : ""}`}>
            Active
          </span>
          <span onClick={()=>setSelect(2)} className={`${select === 2 ? "active" : ""}`}>
            Completed
          </span>
        </div>

      </div>
    </>
  )
}

export default App
