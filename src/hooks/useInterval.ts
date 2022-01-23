import { useEffect, useLayoutEffect, useRef } from "react";

// Thanks, Dan
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export default function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
