import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: 'just now',
  xSeconds: 'just now',
  halfAMinute: 'just now',
  lessThanXMinutes: '{{count}}m',
  xMinutes: '{{count}}m',
  aboutXHours: '{{count}}h',
  xHours: '{{count}}h',
  xDays: '{{count}}d',
  aboutXWeeks: '{{count}}w',
  xWeeks: '{{count}}w',
  aboutXMonths: '{{count}}m',
  xMonths: '{{count}}m',
  aboutXYears: '{{count}}y',
  xYears: '{{count}}y',
  overXYears: '{{count}}y',
  almostXYears: '{{count}}y',
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace('{{count}}', count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result;
    } else {
      if (result === 'just now') return result;
      return result + ' ago';
    }
  }

  return result;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export const formatPathname = (pathname: string) => {
  const words = pathname.split(/[\/-]/).filter(Boolean);

  const formattedWords = words.map((word: string) => {
    // Capitalize the first letter of each word
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const formattedPathname = formattedWords.join(' ');

  return formattedPathname;
};

export function truncateString(
  inputString: string,
  maxLength: number,
  ellipsis: string = '...'
): string {
  return inputString.length <= maxLength
    ? inputString
    : inputString.slice(0, maxLength - ellipsis.length) + ellipsis;
}

export function formatMessageTimestamp(timestamp: Date): string {
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0 && now.getDate() !== timestamp.getDate()) {
    // If the date is today but not the same day, return "Yesterday"
    return 'Yesterday';
  } else if (diffInDays === 1) {
    // If the date is yesterday, return "Yesterday"
    return 'Yesterday';
  } else if (diffInDays === 0) {
    // If the date is today, return time in 12-hour format without seconds
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return timestamp.toLocaleTimeString('en-US', options);
  } else {
    // For other dates, return the formatted date
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return timestamp.toLocaleDateString('en-US', options);
  }
}
