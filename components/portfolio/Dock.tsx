'use client';

import { useState } from 'react';

type DockIconProps = {
  label: string;
  src: string;
  onClick?: () => void;
  href?: string;
};

function DockIcon({ label, src, onClick, href }: DockIconProps) {
  const [hover, setHover] = useState(false);

  const button = (
    <div
      onClick={onClick}
      style={{
        width: 48,
        height: 48,
        borderRadius: '28%',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hover ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </div>
  );

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 'calc(100% + 12px)',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: hover ? 1 : 0,
          transition: 'opacity 0.15s ease',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            padding: '6px 12px',
            borderRadius: 64,
            background: 'white',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: '-0.04em',
              color: 'black',
            }}
          >
            {label}
          </span>
        </div>
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white',
          }}
        />
      </div>

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {button}
        </a>
      ) : (
        button
      )}
    </div>
  );
}

type DockProps = {
  onOpenAbout: () => void;
  onOpenNotes: () => void;
};

export function Dock({ onOpenAbout, onOpenNotes }: DockProps) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 64,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 12,
        borderRadius: 24,
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      <DockIcon
        label="About Me"
        src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_151824_5f47765e-d133-4a38-b8bc-d968a07881a3.png&w=1920&q=85"
        onClick={onOpenAbout}
      />
      <DockIcon
        label="Notes"
        src="https://framerusercontent.com/images/4ar8CL6aUtjymV8jTsXrcPzXCM.svg"
        onClick={onOpenNotes}
      />
      <div
        style={{
          width: 1,
          height: 48,
          background: 'rgba(255,255,255,0.2)',
          borderRadius: 64,
        }}
      />
      <DockIcon
        label="Book a Call"
        src="https://www.gstatic.com/images/branding/product/2x/meet_2020q4_48dp.png"
        href="https://calendly.com/abidinouman/new-meeting"
      />
      <DockIcon
        label="X"
        src="https://framerusercontent.com/images/vjmmhizcqEgw5ZT5SNFQMpxD00.png"
        href="https://www.x.com/"
      />
      <DockIcon
        label="Instagram"
        src="https://framerusercontent.com/images/Q0Z0p8LOZhN2hJ2arLjEtkqQD0.png"
        href="https://www.instagram.com/devly.studio/"
      />
    </div>
  );
}
