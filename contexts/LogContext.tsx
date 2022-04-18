import React, {createContext, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

export type LogRequest = Omit<Log, 'id'>;

const LogContext = createContext<{
  logs: Array<Log>;
  onCreate(log: LogRequest): void;
}>({logs: [], onCreate: (_log: LogRequest) => {}});

export const LogContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [logs, setLogs] = useState<Array<Log>>([]);

  const onCreate = ({title, body, date}: LogRequest) => {
    const log: Log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  return (
    <LogContext.Provider value={{logs, onCreate}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
