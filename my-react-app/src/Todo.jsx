import { useState } from 'react';

function Todo() {

    const [list, setList] = useState([]);

    const addBtn = () => {
        let input = document.getElementById('addList').value;
        document.getElementById('addList').value = ''
        if (input === '') {
           setList([...list]);
           return;
        }
        setList([...list, input]);
    }
    function removeItem(index){
        setList(list.filter((_, i) => i !== index))
    }

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
                <li key={index}> {item} 
                <button onClick={() => removeItem(index)} className='delBtn'>x</button>
                </li>
                ))}
            </ul>
            <input type="text" placeholder='things to do' id='addList'  onKeyDown={handleEnterKey}/>
            <button onClick={addBtn} className='addBtn'>ADD</button>
        </div>
        </>
    )
}

export default Todo
