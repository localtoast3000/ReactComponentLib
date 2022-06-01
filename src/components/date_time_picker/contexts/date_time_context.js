import { format, set, startOfDay, endOfDay } from 'date-fns';
import { createContext, useContext, useReducer } from 'react';

const DateTimeContext = createContext(undefined);

export function DateTimeContextProvider({ children }) {
  const [state, dispatch] = useReducer(dateTimeReducer, { dateTime: new Date() });

  return <DateTimeContext.Provider value={[state, dispatch]}>{children}</DateTimeContext.Provider>;
}

export function useDateTime() {
  const context = useContext(DateTimeContext);
  if (!context) {
    throw new Error('useDateTime must be used within a DateTimeContextProvider');
  }
  return context;
}

function dateTimeReducer(state, action) {
  const setDateTime = (options) => {
    return set(state.dateTime, options);
  };

  switch (action.type) {
    case 'set-date-time': {
      return { ...state, dateTime: setDateTime(action.value) };
    }
    case 'year++': {
      return { ...state, dateTime: setDateTime({ year: Number(format(state.dateTime, 'yyyy')) + 1 }) };
    }
    case 'year--': {
      return { ...state, dateTime: setDateTime({ year: Number(format(state.dateTime, 'yyyy')) - 1 }) };
    }
    case 'month++': {
      return { ...state, dateTime: setDateTime({ month: Number(format(state.dateTime, 'MM')) }) };
    }
    case 'month--': {
      return { ...state, dateTime: setDateTime({ month: Number(format(state.dateTime, 'MM')) - 2 }) };
    }
    case 'day++': {
      return { ...state, dateTime: setDateTime({ date: Number(format(state.dateTime, 'dd')) + 1 }) };
    }
    case 'day--': {
      return { ...state, dateTime: setDateTime({ date: Number(format(state.dateTime, 'dd')) - 1 }) };
    }
    case 'hours++': {
      return { ...state, dateTime: setDateTime({ hours: Number(format(state.dateTime, 'HH')) + 1 }) };
    }
    case 'hours--': {
      return { ...state, dateTime: setDateTime({ hours: Number(format(state.dateTime, 'HH')) - 1 }) };
    }
    case 'mins++': {
      return { ...state, dateTime: setDateTime({ minutes: Number(format(state.dateTime, 'mm')) + 1 }) };
    }
    case 'mins--': {
      return { ...state, dateTime: setDateTime({ minutes: Number(format(state.dateTime, 'mm')) - 1 }) };
    }
    case 'start-of-day': {
      return { ...state, dateTime: startOfDay(state.dateTime) };
    }
    case 'end-of-day': {
      return { ...state, dateTime: endOfDay(state.dateTime) };
    }
    default: {
      throw new Error(`Unable to handle action type ${action.type}`);
    }
  }
}
