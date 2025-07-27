'use client';

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent SSR mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
    
  return (
    <div className='m-2 flex justify-center items-center rounded-3xl border-2 border-gray-600 dark:border-white'>
      <button className='p-2 cursor-pointer' onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <FiSun className='text-white text-[1rem] md:text-[1.5rem]'/> : <FiMoon className='text-gray-600 text-[1rem] md:text-[1.5rem]'/>}
      </button>
    </div>
  )
}
