/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { useRef, useEffect } from 'react';

const useDebounce = () => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const debounce = function (fn: Function, t: number) {
    return function (...args: any[]) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        fn(...args);
      }, t);
    };
  };

  useEffect(() => {
    return () => {
      if (!timeout.current) return;
      clearTimeout(timeout.current);
    };
  }, []);

  return { debounce };
};

export default useDebounce;