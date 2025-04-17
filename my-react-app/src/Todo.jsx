import { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa"

function Todo() {

    function  getStoredData() {
        let data = localStorage.getItem('list');
        let json = JSON.parse(data);

        if (json) {
            return json;
        }
        return [];
    }

    const [list, setList] = useState(getStoredData());
    const [search, setSearch]  = useState('')
    const inputRef = useRef(null)


    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    //     useEffect(() => {
    //         let getList = JSON.parse(localStorage.getItem('list'))
        
    //         if (getList) {
    //             setList(getList)
    //         }
    //     }, [])

    // useEffect(() => {
    //     localStorage.setItem('list', JSON.stringify(list))
    // }, [list])
 
    const addBtn = () => {
        const input = inputRef.current.value;
        inputRef.current.value = ''
        if (input === '') 
            return ;

        const newItem = {
            text: input,
            completed: false
        };
        setList([...list, newItem]);
    }

    function removeItem(index){
        setList(list.filter((_, i) => i !== index))
    }

    const toggleCompleted = (index) => {
        const updatedList = [...list];
        updatedList[index].completed = !updatedList[index].completed;
        setList(updatedList);
    };

    function handleEnterKey(e){
        if (e.key === "Enter"){
            addBtn()
        }
    }

   
    const filteredTask = list.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
        <div className='container'>
            <h2>To Do List</h2>
           <form onSubmit={(e) => e.preventDefault()}>
            <label className='searchLabel'>
                search:
                <input type="text" placeholder='search' className='search' 
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
                
            </label>
           </form>
            {filteredTask.length === 0 && <h4 className='empty'>No tasks available</h4>}   
            <ul>
                {filteredTask.map((item, index) =>(
                <li key={index} className='list'> 
                <input 
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleCompleted(index)}  />
                  <span
                            style={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                marginLeft: '8px',
                                marginRight: '8px'
                            }}
                        >
                            {item.text}
                        </span>
                {/* {item}  */}
                {/* <button onClick={() => removeItem(index)} className='delBtn'>x</button> */}
                <FaTrashAlt role='button' tabIndex= '0' className='delBtn' onClick={() => removeItem(index)}/>
                </li>
                ))}
            </ul>
            
            <input type="text" placeholder='task' ref={inputRef}  onKeyDown={handleEnterKey}/>
            <button onClick={addBtn} className='addBtn'>ADD</button>
            <div className='footer'>
                <span style={{display: filteredTask.length === 0 ? 'none' : 'block'}}>
                <p>{filteredTask.length} task {filteredTask.length <= 1 ? 'list' : 'lists'}</p>
                </span>
            </div>
        </div>
        </>
    )
}

export default Todo
