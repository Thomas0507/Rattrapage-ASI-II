export function truncateString(baseString: string, stopString: string): string {
    return baseString.split(stopString)[0] + stopString;
  }