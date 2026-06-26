'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

type WindowShellProps = {
  title: string;
  wide?: boolean;
  onClose: () => void;
  children: ReactNode;
};

const TRAFFIC_LIGHTS = ['rgb(253,93,92)', 'rgb(250,201,0)', 'rgb(52,199,90)'];

export function WindowShell({ title, wide, onClose, children }: WindowShellProps) {
  const [shown, setShown] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef({ dragging: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const d = drag.current;
    if (!d.dragging) return;
    setPos({ x: d.ox + (e.clientX - d.sx), y: d.oy + (e.clientY - d.sy) });
  }, []);

  const onMouseUp = useCallback(() => {
    drag.current.dragging = false;
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onTitleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const d = drag.current;
      d.dragging = true;
      d.sx = e.clientX;
      d.sy = e.clientY;
      d.ox = pos.x;
      d.oy = pos.y;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [onMouseMove, onMouseUp, pos.x, pos.y],
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: wide ? '70vw' : '60vw',
          maxWidth: wide ? 840 : 720,
          maxHeight: '70vh',
          borderRadius: 24,
          background: 'white',
          boxShadow: '0 32px 80px rgba(0,0,0,0.28)',
          pointerEvents: 'all',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          opacity: shown ? 1 : 0,
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${shown ? 1 : 0.8})`,
          transition:
            'transform 0.4s cubic-bezier(0.34,1.28,0.64,1), opacity 0.3s ease',
        }}
      >
        <div
          onMouseDown={onTitleMouseDown}
          style={{
            height: 40,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            borderBottom: '1px solid rgb(229,229,234)',
            cursor: 'grab',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {TRAFFIC_LIGHTS.map((color) => (
              <button
                key={color}
                onClick={onClose}
                aria-label="Close window"
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: color,
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: "'Inter',sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: 'rgb(134,134,139)',
              letterSpacing: '-0.04em',
              userSelect: 'none',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </span>
          {/* Spacer mirroring the traffic lights to keep the title centered. */}
          <div style={{ width: 52 }} />
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
