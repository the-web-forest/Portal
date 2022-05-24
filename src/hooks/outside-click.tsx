import { MutableRefObject, useEffect, useRef } from 'react';

export function useClickOutside<Element = any>(
  handler: () => void,
  active = true,
): MutableRefObject<Element> {
  const domNode = useRef(null);

  useEffect(() => {
    const maybeHandler = (event: any): void => {
      //@ts-ignore
      if (active && !domNode.current?.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });
  //@ts-ignore
  return domNode;
}
