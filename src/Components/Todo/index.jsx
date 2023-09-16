import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import './index.scss';
import { v4 as uuid } from 'uuid';
import { useSettings } from '../../context/SettingContext'; // Update the path to your SettingsContext
import { Pagination } from '@mantine/core';

const Todo = () => {
  const { settings } = useSettings();
  const { itemsToShow, showCompleted } = settings;
  const [currentPage, setCurrentPage] = useState(1);
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
    const items = list.filter((item) => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (list.length > 0) {
      let incompleteCount = list.filter((item) => !item.complete).length;
      setIncomplete(incompleteCount);
      document.title = `To Do List: ${incomplete}`;
    }
  }, [list]);

  // Filter and paginate the list based on settings
  const filteredItems = showCompleted
    ? list
    : list.filter((item) => !item.complete);

  const startIndex = (currentPage - 1) * itemsToShow;
  const endIndex = startIndex + itemsToShow;

  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className='container'>
      <header data-testid='todo-header'>
        <h1 data-testid='todo-h1'>To Do List: {incomplete} items pending</h1>
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
              <div onClick={() => toggleComplete(item.id)}>
                <p>
                  <span
                    className={`item ${
                      item.complete ? 'Complete' : 'pending'
                    }`}
                  >
                    {item.complete ? 'Complete' : 'Pending'}{' '}
                  </span>{' '}
                  <small>{item.assignee}</small>
                </p>
              </div>
              <hr />
              <p>{item.text}</p>
              <p className='right-b'>
                <small>Difficulty: {item.difficulty}</small>
              </p>
            </div>
          ))}
          <Pagination
            total={Math.ceil(filteredItems.length / itemsToShow)}
            value={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Todo;
