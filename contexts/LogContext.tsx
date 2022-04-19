import React, {createContext, useEffect, useRef, useState} from 'react';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import logsStorage from '../storages/logsStorage';

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
  onRemove(id: string): void;
}>({
  logs: [],
  onCreate: (_log: LogRequest) => {},
  onModify(_modified: Log) {},
  onRemove(_id: string) {},
});

export const LogContextProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const initialLogsRef = useRef<Log[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);

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

  const onRemove = (id: string) => setLogs(logs.filter(log => log.id !== id));

  useEffect(() => {
    // useEffect 내에서 async 함수를 만들고 바로 호출
    // IIFE 패턴
    (async () => {
      const savedLogs = await logsStorage.get();
      initialLogsRef.current = savedLogs;
      setLogs(savedLogs);
    })();
  }, []);

  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return;
    }
    logsStorage.set(logs).then();
  }, [logs]);

  return (
    <LogContext.Provider value={{logs, onCreate, onModify, onRemove}}>
      {children}
    </LogContext.Provider>
  );
};

export default LogContext;
