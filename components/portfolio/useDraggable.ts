'use client';

import { useCallback, useRef, useState } from 'react';

const DRAG_THRESHOLD = 5;

type DragState = {
  dragging: boolean;
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  cx: number;
  cy: number;
};

export function useDraggable() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const state = useRef<DragState>({
    dragging: false,
    sx: 0,
    sy: 0,
    ox: 0,
    oy: 0,
    cx: 0,
    cy: 0,
  });
  // Becomes true once movement passes the threshold so callers can
  // distinguish a click from a drag.
  const isDraggingRef = useRef(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const s = state.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.sx;
    const dy = e.clientY - s.sy;
    s.cx = dx;
    s.cy = dy;
    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      isDraggingRef.current = true;
    }
    setPos({ x: s.ox + dx, y: s.oy + dy });
  }, []);

  const onMouseUp = useCallback(() => {
    state.current.dragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const s = state.current;
      s.dragging = true;
      s.sx = e.clientX;
      s.sy = e.clientY;
      s.ox = pos.x;
      s.oy = pos.y;
      s.cx = 0;
      s.cy = 0;
      isDraggingRef.current = false;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [onMouseMove, onMouseUp, pos.x, pos.y],
  );

  return { pos, onMouseDown, isDraggingRef };
}
