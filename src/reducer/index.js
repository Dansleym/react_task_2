const initialState = {
  fetching: true,
  todos: null,
};

const reducer = (state = initialState, action) => {
  const { todos } = state;

  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, fetching: true };
    case 'FETCH_TODOS_END':
      return { ...state, fetching: false };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'MAKE_ACTIVE':
      // const updatedTodos = state.todos.map(item => ({
      //   ...item,
      //   status: item.id === action.payload,
      // }));
      let itemIdx = todos.findIndex(item => item.id === action.payload);

      if (itemIdx === -1) return state;

      const updatedTodos = todos.slice();
      const item = { ...todos[itemIdx] };

      item.startTime = new Date().toUTCString();

      updatedTodos.splice(itemIdx, 1, item);

      return { state, todos: updatedTodos };
    case 'SEARCH_TODO_ITEM':
        const searchTerm = action.payload;

        if(searchTerm.length >= 0) {
          const newTodos = state.todos.in_progress.filter((item) => {
            console.log(item.name)
            if(searchTerm === "") {
              return item;
            } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return item;
            }
          });
          if(searchTerm.length >= 3) {
            todos.in_progress = newTodos;
            return { state, todos: todos };
          } else {
            return state;
          }
        }
      return state;

    case 'START_TODO_ITEM':
      const doneId = action.payload - 1;
      const updDone = [...todos.in_progress.filter(({id}) => id === doneId)];
      updDone[0].isActive = false;
      updDone[0]['finishedTime'] = new Date().toLocaleTimeString();

      const updProgress = [...todos.in_progress.filter(({id}) => id === action.payload)];
      updProgress[0].isActive = true;
      updProgress[0]['startTime'] = new Date().toLocaleTimeString();

      todos.done =  [...state.todos.done, ...updDone];

      todos.in_progress = todos.in_progress.filter(({id}) => id !== doneId);

      return { state, todos: todos }

    case 'DELETE_TODO_ITEM':
      todos.in_progress = todos.in_progress.filter(({id}) => id !== action.payload);
      console.log(todos)

      return { state, todos: todos }

    default:
      return state;
  }
};

export default reducer;
