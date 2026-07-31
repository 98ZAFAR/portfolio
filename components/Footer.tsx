'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-bg py-20 border-t border-border">
      <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row justify-center items-center gap-stack-lg">
        <div className="flex flex-col items-center gap-4">
          <span className="font-display-lg text-body-lg font-bold text-text">MOHAMMAD ZAFAR</span>
          <p className="text-text-secondary font-body-md text-label-sm">© {new Date().getFullYear()} DESIGNED & BUILT BY MOHAMMAD ZAFAR</p>
        </div>
      </div>
    </footer>
  );
}
