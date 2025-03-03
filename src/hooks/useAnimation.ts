
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(
  options = { threshold: 0.1, rootMargin: '0px' }
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return { elementRef, isIntersecting };
}

export function useAnimatedText(text: string, delay = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setIsComplete(false);
    setDisplayedText('');

    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return { displayedText, isComplete };
}

export function useHoverEffect() {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onTouchStart: () => setIsHovered(true),
    onTouchEnd: () => setIsHovered(false),
  };
  
  return { isHovered, hoverProps };
}
