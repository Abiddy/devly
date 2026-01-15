import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper = ({ children, className = '', id }: SectionWrapperProps) => {
  return (
    <section id={id} className={`w-full flex justify-center py-20 px-6 md:px-12 ${className}`}>
      <div className="w-full max-w-[1200px] flex flex-col">
        {children}
      </div>
    </section>
  );
};
