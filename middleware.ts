import { i18nRouter } from 'next-i18n-router';
import { i18nConfig } from '@/i18nConfig';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { NextURL } from 'next/dist/server/web/next-url';

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  console.log('URL: ', origin + pathname);
  //check credentials and if need - redirect user befor i18n
  // example: https://trillionclues.medium.com/how-to-configure-secure-routes-using-next-js-middleware-the-best-way-320fe1f7236d
  //--------------------------
  return i18nRouter(request, i18nConfig);
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
