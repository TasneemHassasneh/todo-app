import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import './index.scss';
import { v4 as uuid } from 'uuid';
import { SettingsProvider, useSettings } from '../../context/SettingContext';
import { Pagination } from '@mantine/core';

const Todo = () => {
  const { displaySettings } = useSettings();
  const [currentPage, setCurrentPage] = useState(1);
  const { itemsPerPage, hideCompletedItems } = displaySettings;
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log('itemsPerPage:', itemsPerPage);
    console.log('hideCompletedItems:', hideCompletedItems);
  
    if (list.length > 0) {
      let incompleteCount = list.filter(item => !item.complete).length;
      setIncomplete(incompleteCount);
      document.title = `To Do List: ${incomplete}`;
    }
    // linter will want 'incomplete' added to the dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);
  const filteredItems = hideCompletedItems
  ? list.filter((item) => !item.complete)
  : list;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <SettingsProvider >
       <div className='container'>
    <header data-testid="todo-header">
      <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
    </header>
    <div className='work-place'>
      <form onSubmit={handleSubmit}>

        <h2>Add To Do Item</h2>

        <label>
          <span>To Do Item</span>
          <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
        </label>

        <label>
          <span>Assigned To</span>
          <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
        </label>

        <label>
          <span>Difficulty</span>
          <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
        </label>

        <label>
          <button type="submit">Add Item</button>
        </label>
      </form>
      <div className='todo-list'>
      {paginatedItems.map((item) => (
          <div className='todo-item' key={item.id}>
              <div
                onClick={() => toggleComplete(item.id)}
              >
                <p><span className={`item ${item.complete ? "Complete" : "pending"}`}>{item.complete ? "Complete" : "Pending"} </span> <small>{item.assignee}</small></p>

              </div>
              <hr />
              <p>{item.text}</p>
              <p className='right-b'><small>Difficulty: {item.difficulty}</small></p>

            </div>
        ))}
          <Pagination
        total={Math.ceil(filteredItems.length / itemsPerPage)}
        value={currentPage}
        onChange={handlePageChange}
      />
      </div>
    </div>
  </div>
  
    </SettingsProvider>
   
  );
};

export default Todo;

