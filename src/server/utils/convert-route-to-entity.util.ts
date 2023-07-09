const mapping: Record<string, string> = {
  locations: 'location',
  organizations: 'organization',
  users: 'user',
  weathers: 'weather',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
