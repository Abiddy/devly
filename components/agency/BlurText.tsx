'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type CSSProperties,
} from 'react';
import { motion } from 'framer-motion';

type AnimationState = {
  filter?: string;
  opacity?: number;
  y?: number;
};

type BlurTextProps = {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'chars';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationState;
  animationTo?: AnimationState[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: ElementType;
  style?: CSSProperties;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function BlurText({
  text,
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = easeOutCubic,
  onAnimationComplete,
  stepDuration = 0.35,
  as: Tag = 'p',
  style,
}: BlurTextProps) {
  const elements = useMemo(
    () => (animateBy === 'words' ? text.split(' ') : text.split('')),
    [animateBy, text],
  );
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom: AnimationState =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, y: -50 }
      : { filter: 'blur(10px)', opacity: 0, y: 50 };

  const defaultTo: AnimationState[] =
    direction === 'top'
      ? [
          { filter: 'blur(5px)', opacity: 0.5, y: 5 },
          { filter: 'blur(0px)', opacity: 1, y: 0 },
        ]
      : [
          { filter: 'blur(5px)', opacity: 0.5, y: -5 },
          { filter: 'blur(0px)', opacity: 1, y: 0 },
        ];

  const from = animationFrom ?? defaultFrom;
  const to = animationTo ?? defaultTo;
  const steps = to.length;
  const times = Array.from({ length: steps + 1 }, (_, i) => i / steps);
  const duration = stepDuration * steps;

  const filterKeyframes = [from.filter ?? 'blur(0px)', ...to.map((s) => s.filter ?? 'blur(0px)')];
  const opacityKeyframes = [from.opacity ?? 1, ...to.map((s) => s.opacity ?? 1)];
  const yKeyframes = [from.y ?? 0, ...to.map((s) => s.y ?? 0)];

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        ...style,
      }}
    >
      {elements.map((segment, index) => (
        <motion.span
          key={`${segment}-${index}`}
          className="inline-block will-change-[transform,filter,opacity]"
          initial={{
            filter: filterKeyframes[0],
            opacity: opacityKeyframes[0],
            y: yKeyframes[0],
          }}
          animate={
            inView
              ? {
                  filter: filterKeyframes,
                  opacity: opacityKeyframes,
                  y: yKeyframes,
                }
              : {
                  filter: filterKeyframes[0],
                  opacity: opacityKeyframes[0],
                  y: yKeyframes[0],
                }
          }
          transition={{
            duration,
            delay: (index * delay) / 1000,
            times,
            ease: easing,
          }}
          onAnimationComplete={
            index === elements.length - 1 ? onAnimationComplete : undefined
          }
        >
          {segment === ' ' ? '\u00A0' : segment}
          {animateBy === 'words' && index < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </Tag>
  );
}
