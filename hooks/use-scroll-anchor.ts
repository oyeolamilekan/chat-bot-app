import { useCallback, useEffect, useRef, useState } from 'react';

export const useScrollAnchor = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = scrollRef.current;
        const offset = 25;
        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - offset);
      }
    };

    const scrollElement = scrollRef.current;

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    };

    const options: IntersectionObserverInit = {
      rootMargin: '0px 0px -150px 0px'
    };

    const visibilityObserver = new IntersectionObserver(handleVisibilityChange, options);

    if (visibilityRef.current) {
      visibilityObserver.observe(visibilityRef.current);
    }

    return () => {
      visibilityObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isAtBottom && !isVisible) {
      scrollToBottom();
    }
  }, [isAtBottom, isVisible, scrollToBottom]);

  return {
    messagesRef,
    scrollRef,
    visibilityRef,
    scrollToBottom,
    isAtBottom,
    isVisible
  };
};
