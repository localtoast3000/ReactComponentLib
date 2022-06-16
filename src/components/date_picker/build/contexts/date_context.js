import { format, set } from 'date-fns';
import { createContext, useContext, useReducer } from 'react';

const DateContext = createContext(undefined);

export function DateContextProvider({ children }) {
  const [state, dispatch] = useReducer(dateReducer, { date: new Date() });

  return <DateContext.Provider value={[state, dispatch]}>{children}</DateContext.Provider>;
}

export function useDate() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateContextProvider');
  }
  return context;
}

function dateReducer(state, action) {
  const setDate = (options) => {
    return set(state.date, options);
  };

  switch (action.type) {
    case 'new-date': {
      return { ...state, date: action.value };
    }
    case 'set-date': {
      return { ...state, date: setDate(action.value) };
    }
    case 'year++': {
      return { ...state, date: setDate({ year: Number(format(state.date, 'yyyy')) + 1 }) };
    }
    case 'year--': {
      return { ...state, date: setDate({ year: Number(format(state.date, 'yyyy')) - 1 }) };
    }
    case 'month++': {
      return { ...state, date: setDate({ month: Number(format(state.date, 'MM')) }) };
    }
    case 'month--': {
      return { ...state, date: setDate({ month: Number(format(state.date, 'MM')) - 2 }) };
    }
    case 'day++': {
      return { ...state, date: setDate({ date: Number(format(state.date, 'dd')) + 1 }) };
    }
    case 'day--': {
      return { ...state, date: setDate({ date: Number(format(state.date, 'dd')) - 1 }) };
    }
    default: {
      throw new Error(`Unable to handle action type ${action.type}`);
    }
  }
}
