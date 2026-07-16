'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TrueFocus.css';

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = '#5227FF',
  glowColor = 'rgba(82, 39, 255, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}) => {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [bracketPosition, setBracketPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const words = sentence.split(' ');

  useEffect(() => {
    if (manualMode) return;

    const interval = setInterval(() => {
      setFocusedIndex(prev => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);

    return () => clearInterval(interval);
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    const currentWord = wordRefs.current[focusedIndex];
    if (currentWord) {
      const containerEl = currentWord.closest('.truefocus-container') as HTMLElement;
      if (!containerEl) return;
      const containerRect = containerEl.getBoundingClientRect();
      const wordRect = currentWord.getBoundingClientRect();
      setBracketPosition({
        top: wordRect.top - containerRect.top,
        left: wordRect.left - containerRect.left,
        width: wordRect.width,
        height: wordRect.height
      });
    }
  }, [focusedIndex]);

  const handleWordClick = (index: number) => {
    if (manualMode) {
      setFocusedIndex(index);
    }
  };

  return (
    <div className="truefocus-container">
      <div className="truefocus-sentence">
        {words.map((word, index) => (
          <span
            key={index}
            ref={el => { wordRefs.current[index] = el; }}
            className={`truefocus-word ${index === focusedIndex ? 'focused' : ''}`}
            onClick={() => handleWordClick(index)}
            style={{
              filter: index === focusedIndex ? 'none' : `blur(${blurAmount}px)`,
              transition: `filter ${animationDuration}s ease`
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <AnimatePresence>
        {wordRefs.current[focusedIndex] && (
          <motion.div
            className="truefocus-bracket"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            style={{
              top: bracketPosition.top,
              left: bracketPosition.left,
              width: bracketPosition.width,
              height: bracketPosition.height,
              borderColor: borderColor,
              boxShadow: `0 0 10px ${glowColor}`
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrueFocus;
