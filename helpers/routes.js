export const unProtectedRoutes = () => {
    return ['/auth/signin', '/auth/signup'];
}

export const headerSupportRoute = (route_pathname = false) => {
    let routes = ['/organization/*'];

    if (route_pathname) {
        let check = routes.some((route) => {
            if (route.includes('*')) {
                let regexPattern = new RegExp('^' + route.replace('*', '.*'));
                return regexPattern.test(route_pathname);
            } else {
                return route === route_pathname;
            }
        });
        return check;

    }

    return routes;
}

