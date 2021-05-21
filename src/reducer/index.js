const initialState = {
  fetching: true,
  todos: null,
  filtered: null,
};

const reducer = (state = initialState, action) => {
  const { todos } = state;

  switch (action.type) {
    case 'FETCH_TODOS_START':
      return { ...state, fetching: true };
    case 'FETCH_TODOS_END':
      return { ...state, fetching: false };
    case 'SET_TODOS':
      return { ...state, todos: action.payload, filtered: action.payload };

    case 'ADD_ACTIVE':
      const newAddTodos = {
        id: new Date().getUTCMilliseconds() * Math.random(),
        name: action.payload,
        isActive: false,
      }
      return { ...state,
        todos: {...todos, in_progress: [...state.todos.in_progress, newAddTodos]},
        filtered:{...todos, in_progress: [...state.todos.in_progress, newAddTodos]}
      };

    case 'SEARCH_TODO_ITEM':
        const searchTerm = action.payload;
        if(searchTerm.length >= 0) {
          const newTodos = state.filtered.in_progress.filter((item) => {
            if(searchTerm === "") {
              return item;
            } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return item;
            }
          });
          const newDoneTodos = state.filtered.done.filter((item) => {
            if(searchTerm === "") {
              return item;
            } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return item;
            }
          });
          if(searchTerm.length >= 3) {
            return { ...state, todos: {...todos, in_progress: [...newTodos], done: [...newDoneTodos]}};
          } else {
            return { ...state, todos: {...todos, in_progress: [...state.filtered.in_progress], done: [...state.filtered.done]}};
          }
        }
      return { ...state, todos: {...todos, in_progress: [...state.filtered.in_progress], done: [...state.filtered.done]}};

    case 'START_TODO_ITEM':
      const doneId = state.todos.in_progress[0].id;
      const updDone = [...todos.in_progress.filter(({id}) => id === doneId)];
      updDone[0].isActive = false;
      updDone[0]['finishedTime'] = new Date().toLocaleTimeString();
      todos.done =  [...state.todos.done, ...updDone];
      const updProgress = [...todos.in_progress.filter(({id}) => id === action.payload)];
      updProgress[0].isActive = todos.in_progress.length !== 1;
      updProgress[0]['startTime'] = new Date().toLocaleTimeString();
      const newSearchTodos = todos.in_progress.filter(({id}) => id !== doneId);
      return { ...state,
        todos: {...todos, in_progress: [...newSearchTodos]},
        filtered: {...todos, in_progress: [...newSearchTodos]}
      };

    case 'DELETE_TODO_ITEM':
      const newTodos = todos.in_progress.filter(({id}) => id !== action.payload);
      return { ...state,
        todos: {...todos, in_progress: [...newTodos]},
        filtered: {...todos, in_progress: [...newTodos]}
      };

    default:
      return state;
  }
};

export default reducer;
