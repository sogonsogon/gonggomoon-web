export const PROTECTED_ROUTES = {
  PREFIXES: ['/my'],
  PATTERNS: [/^\/strategy\/result\/\d+$/, /^\/interview\/result\/\d+$/],
} as const;

export const isProtectedRoute = (pathname: string): boolean => {
  // Prefix 검사
  const isPrefixMatch = PROTECTED_ROUTES.PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isPrefixMatch) return true;

  // 정규식 패턴 검사
  const isPatternMatch = PROTECTED_ROUTES.PATTERNS.some((pattern) => pattern.test(pathname));
  return isPatternMatch;
};
