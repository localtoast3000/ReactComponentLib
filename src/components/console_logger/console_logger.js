import { useEffect, useState } from 'react';
import * as d from 'date-fns';

export default function ConsoleLogger() {
  const [state, setState] = useState(new Date());

  const endOfDay = () => {
    setState(d.endOfDay(state));
  };
  const startOfDay = () => {
    setState(d.startOfDay(state));
  };

  useEffect(() => {
    startOfDay();
  }, []);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <></>;
}
