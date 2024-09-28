'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import path from 'path';

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  //TODO: check auth session. If user is logged in, redirect to dashbord
  const user = true;

  useEffect(() => {
    // const url = `${pathname}?${searchParams}`;
    // console.log(url);
    if (pathname !== '/' && !user) {
      router.push('/');
    }
    if (pathname === '/' && user) {
      router.push('/dashboard');
    }
  }, [pathname, searchParams, router, user]);

  return '';
}
