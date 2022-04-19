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
  onModify(modified: Log): void;
}>({logs: [], onCreate: (_log: LogRequest) => {}, onModify(_modified: Log) {}});

export const LogContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [logs, setLogs] = useState<Array<Log>>(
    Array.from({length: 1})
      .map((_, index) => ({
        id: uuidv4(),
        title: `Log ${index}`,
        body: `Log ${index}`,
        date: new Date().toISOString(),
      }))
      .reverse(),
  );

  const onCreate = ({title, body, date}: LogRequest) => {
    const log: Log = {
      id: uuidv4(),
      title,
      body,
      date,
    };
    setLogs([log, ...logs]);
  };

  const onModify = (modified: Log) => {
    // logs 배열을 순회해 id가 일치하면 log를 교체하고 그렇지 않으면 유지
    const nextLogs = logs.map(log => (log.id === modified.id ? modified : log));
    setLogs(nextLogs);
  };

  return (
    <LogContext.Provider value={{logs, onCreate, onModify}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
