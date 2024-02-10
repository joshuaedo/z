import { headers } from 'next/headers';

export function getPathnameFromServer() {
  const headersList = headers();
  const url = headersList.get('referer');
  const urlParts = url?.split('/');
  const pathname = urlParts && urlParts[urlParts.length - 1];
  return pathname;
}
