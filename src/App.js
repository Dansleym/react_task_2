import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import List from './components/List';
import ListItem from './components/ListItem';
import Buttons from './components/Buttons';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import {delTodos} from "./actions";

const App = (props) => {
  const [todoList, setTodoList] = useState({
    inProgress: [],
    done: [],
  });
  const { setTodos, todos, startLoad, fetching, endLoad, delTodos, startTodos, searchTodos } = props;
  const addInputRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    (async () => {
      startLoad();
      const { in_progress, done } = await fetch('/todos.json').then(res =>
        res.json()
      );
      // setTodoList(state => ({ ...state, inProgress: in_progress, done }));
      setTodos({
        in_progress,
        done,
      });
      endLoad();
    })();

    return () => {};
  }, []);

  const loading = <p>Loading...</p>;

  const renderDoneItem = ({ name, finishedTime }) => (
    <>
      <span className='badge'>
        {finishedTime}
      </span>
      {name}
    </>
  );

  const renderInProgressItem = ({ id, name, isActive}, next) => (
    <>
      {name}
      {isActive ? (
          <></>
      ) : (next.id === id) ? (
          <>
            <Buttons variant="btn btn-primary" text="Start" onclick={() => startHandler(id)}/>
            <Buttons variant="btn btn-danger" text="Del" onclick={() => deleteHandler(id)} />
          </>
      ) : (
          <>
            <Buttons variant="btn btn-danger" text="Del" onclick={() => deleteHandler(id)} />
          </>
      )}
    </>
  );

  const searchHandler = () => {
    searchTodos(searchInputRef.current.value);
  }

  const startHandler = id => {
    startTodos(id);
  }
  const deleteHandler = id => {
    delTodos(id);
  }

  return (
    <div className='container'>
      <h1>Todo React APP</h1>
      <div className='row'>
        <div className='col-xs-12'>
          <form>
              <div className='form-group'>
                  <label htmlFor='searchInput'>Search in todo: </label>
                  <input
                      ref={searchInputRef}
                      onChange={searchHandler}
                      id='searchInput'
                      type='text'
                      className='form-control'
                      placeholder='Search...'
                  />
              </div>

            <div className='form-group'>
              <label htmlFor='addInput'>New Todo Item: </label>
              <input
                ref={addInputRef}
                id='addInput'
                type='text'
                className='form-control'
                placeholder='New todo name'
              />
            </div>
            <button type='button' className='btn btn-success pull-right'>
              Add New Item
            </button>
          </form>
        </div>
      </div>
      <hr />
      <div className='row'>
        <div className='col-xs-12 col-sm-6'>
          <h3>Todos in progress {1}</h3>
          {fetching ? (
            loading
          ) : (
            <List>
              {todos.in_progress.map(item => {
                const { id } = item;
                return (
                  <ListItem
                    key={id}
                    item={item}
                    next={todos.in_progress[1] ? todos.in_progress[1] : ""}
                    render={renderInProgressItem}
                  />
                );
              })}
            </List>
          )}
          <p>Things to do: {todos ? todos.in_progress.length : 0}</p>
        </div>
        <div className='col-xs-12 col-sm-6'>
          <h3>Done</h3>

          {fetching ? (
            loading
          ) : (
            <List>
              {todos.done.map(({ id, ...item }) => (
                <ListItem key={id} item={item} render={renderDoneItem} />
              ))}
            </List>
          )}

          <p>Done: {todos ? todos.done.length : 0}</p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  fetching: state.fetching,
  todos: state.todos,
});

const mapDispatchToProps = dispatch => {
  const { startLoad, endLoad, setTodos, delTodos, startTodos, searchTodos } = bindActionCreators(
    actions,
    dispatch
  );

  return {
    startLoad,
    endLoad,
    delTodos: id => delTodos(id),
    startTodos: id => startTodos(id),
    searchTodos: term => searchTodos(term),
    setTodos: list => setTodos(list)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
