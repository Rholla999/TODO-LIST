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

    return (
        <>
        <div className='container'>
            <h2>To Do List</h2>
            <ul>
                {list.map((item, index) =>(
                <li key={index} onClick={() =>removeItem(index)}> {item} </li>
                ))}
            </ul>
            <input type="text" placeholder='things to do' id='addList' />
            <button onClick={addBtn}>ADD</button>
        </div>
        </>
    )
}

export default Todo
