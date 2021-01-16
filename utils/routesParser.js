const routeParser = (routes, parentPath) => {
  return routes.reduce(
    (accumulatedRoutes, route) => [
      ...accumulatedRoutes,
      ...(route.subRoutes
        ? routeParser(route.subRoutes, `${parentPath}${route.path}`)
        : []),
      ...(route.RouteClass
        ? [new route.RouteClass(route.path, parentPath)]
        : []),
    ],
    []
  );
};

module.exports = (routes) => routeParser(routes, '');
