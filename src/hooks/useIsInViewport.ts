import { useState, useEffect, useMemo, RefObject } from 'react';

export const useIsInViewport = <T extends HTMLElement>(
  ref: RefObject<T>,
): boolean => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [],
  );

  useEffect(() => {
    const { current: element } = ref;
    if (!element) return;

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
};
