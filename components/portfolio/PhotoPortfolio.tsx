'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { Dock } from './Dock';
import { WindowShell } from './WindowShell';
import { projects } from './projects';
import type { Project } from './projects';

const BACKGROUND_URL =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_151236_784929aa-a992-4292-9938-1dd9b5296a29.png&w=1920&q=85';

type WindowItem =
  | { kind: 'project'; key: string; project: Project }
  | { kind: 'about'; key: string }
  | { kind: 'notes'; key: string };

export function PhotoPortfolio() {
  const [windows, setWindows] = useState<WindowItem[]>([]);

  const closeWindow = (key: string) =>
    setWindows((w) => w.filter((item) => item.key !== key));

  const openProject = (project: Project) => {
    setWindows((w) => {
      if (w.some((item) => item.kind === 'project' && item.key === project.id)) {
        return w;
      }
      return [...w, { kind: 'project', key: project.id, project }];
    });
  };

  const openSingleton = (kind: 'about' | 'notes') => {
    setWindows((w) => {
      if (w.some((item) => item.kind === kind)) return w;
      return [...w, { kind, key: kind }];
    });
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'white',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("${BACKGROUND_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(84,84,84,0) 0%, rgb(0,0,0) 100%)',
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '47.375%',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 40%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 40%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={openProject} />
      ))}

      <Dock
        onOpenAbout={() => openSingleton('about')}
        onOpenNotes={() => openSingleton('notes')}
      />

      {windows.map((item) => {
        if (item.kind === 'project') {
          const { project } = item;
          return (
            <WindowShell
              key={item.key}
              title={project.title}
              onClose={() => closeWindow(item.key)}
            >
              <div style={{ position: 'relative', width: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 12,
                    display: 'block',
                  }}
                />
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px 18px',
                      borderRadius: 64,
                      background: 'rgb(0,102,221)',
                      color: 'white',
                      textDecoration: 'none',
                      fontFamily: "'Inter',sans-serif",
                      fontWeight: 500,
                      fontSize: 15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    View
                  </a>
                ) : null}
              </div>
              {project.description ? (
                <p
                  style={{
                    margin: 0,
                    fontFamily: "'Inter',sans-serif",
                    fontWeight: 400,
                    fontSize: 16,
                    lineHeight: '1.5em',
                    letterSpacing: '-0.02em',
                    color: 'rgb(60,60,67)',
                  }}
                >
                  {project.description}
                </p>
              ) : null}
            </WindowShell>
          );
        }

        if (item.kind === 'about') {
          return (
            <WindowShell
              key={item.key}
              title="About Me"
              onClose={() => closeWindow(item.key)}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Inter',sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '1.6em',
                  letterSpacing: '-0.02em',
                  color: 'rgb(60,60,67)',
                }}
              >
                I&apos;m a software engineer and consultant helping businesses
                ship smarter online — polished websites, SEO that gets you found,
                and custom software built to solve real problems. I like clean
                code, clear results, and making the web feel a little less
                chaotic. This is a sample of recent work — drag the cards
                around, open one up, and take a look.
              </p>
            </WindowShell>
          );
        }

        return (
          <WindowShell
            key={item.key}
            title="Notes"
            onClose={() => closeWindow(item.key)}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Inter',sans-serif",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: 'rgb(60,60,67)',
              }}
            >
              Scattered thoughts, shoot plans, and reminders live here. More to
              come.
            </p>
          </WindowShell>
        );
      })}
    </div>
  );
}
