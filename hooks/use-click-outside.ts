import { useEffect, useRef } from 'react';

type ClickOutsideHandler = (event: MouseEvent) => void;

export const useClickOutside = (handler: ClickOutsideHandler, additionalIdName?: string) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const maybeHandler: ClickOutsideHandler = (event) => {
      if (
        additionalIdName &&
        event.target instanceof Element &&
        event.target.id !== additionalIdName &&
        nodeRef.current &&
        !nodeRef.current.contains(event.target)
      ) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [handler, additionalIdName]);

  return nodeRef;
};
