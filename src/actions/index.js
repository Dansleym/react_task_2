export const setTodos = todoItems => {
  return {
    type: 'SET_TODOS',
    payload: todoItems,
  };
};

export const addTodos = txt => ({
  type: 'ADD_ACTIVE',
  payload: txt,
});

export const delTodos = id => {
  return {
    type: 'DELETE_TODO_ITEM',
    payload: id,
  };
};

export const startTodos = id => {
  return {
    type: 'START_TODO_ITEM',
    payload: id,
  };
};

export const searchTodos = term => {
  return {
    type: 'SEARCH_TODO_ITEM',
    payload: term,
  };
};

export const startLoad = () => ({
  type: 'FETCH_TODOS_START',
});

export const endLoad = () => ({
  type: 'FETCH_TODOS_END',
});
