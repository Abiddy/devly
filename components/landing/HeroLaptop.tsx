'use client';

import Image from 'next/image';

export function HeroLaptop() {
  return (
    <div
      aria-hidden
      className="hero-laptop-scene relative mx-auto flex min-h-[380px] w-full max-w-xl items-center justify-center sm:min-h-[440px] lg:min-h-[520px]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(204,145,102,0.14),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.06),transparent_45%)]" />

      <div className="hero-laptop-stage">
        <div className="hero-laptop-orbit">
          <div className="hero-laptop">
            <div className="hero-laptop-screen">
              <div className="hero-laptop-display">
                <Image
                  src="/showcase/rizq.png"
                  alt=""
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 480px"
                />
                <div className="hero-laptop-glare" />
              </div>
            </div>
            <div className="hero-laptop-hinge" />
            <div className="hero-laptop-base">
              <div className="hero-laptop-trackpad" />
            </div>
          </div>
        </div>
      </div>

      <div className="hero-laptop-shadow" />
    </div>
  );
}
