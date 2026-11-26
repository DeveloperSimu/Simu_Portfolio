import { useEffect, useState } from 'react';

const TYPE_SPEED = 75;
const DELETE_SPEED = 42;
const HOLD_DURATION = 1800;

export function useTypewriter(words: string[]): string {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout: number;

    if (!isDeleting && text === current) {
      timeout = window.setTimeout(() => setIsDeleting(true), HOLD_DURATION);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((index) => (index + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => setText(current.slice(0, text.length + (isDeleting ? -1 : 1))),
        isDeleting ? DELETE_SPEED : TYPE_SPEED,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}
