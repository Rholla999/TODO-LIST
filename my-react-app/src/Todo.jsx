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
    return (
        <>
        <div className='container'>
            <h2>To Do List</h2>
            <ul>
                {list.map((item, index) =>(
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
        </div>
        </>
    )
}

export default Todo
