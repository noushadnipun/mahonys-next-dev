export const SecondaryMenus = (pathname) => {
    let menus = {
        'contacts' : {
            url : '',
            label : 'Contacts',
            submenu: [
                {
                    url: '/contacts/customers',
                    label: 'Customers',
                    name : 'customers'
                },
                {
                    url: '/contacts/users',
                    label: 'Users',
                    name : 'users'
                },
                {
                    url: '/contacts/drivers',
                    label: 'Drivers',
                    name : 'drivers'
                },
                {
                    url: '/contacts/subcontractors',
                    label: 'Subcontractors',
                    name : 'subcontractors'
                },
            ]
        },
        'commodities' : {
            url : '',
            label : 'Commodities',
            submenu:[
                {
                    url : '/commodities/',
                    label: 'All',
                    name: 'commodities'
                },
                {
                    url : '/commodities/c-types',
                    label: 'Commodities Types',
                    name: 'c-types'
                }
            ]
        },
        'contracts' : {
            url : '',
            label : 'Commodities'
        },
        'assets' : {
            url : '',
            label : 'Assets'
        },

    }

    let getOnlyMenuKey = Object.keys(menus);
    let matchingPart = findMatchingPart(pathname, getOnlyMenuKey)
    let menu =  matchingPart ? menus[matchingPart] : [];
    return menu;
}

export function findMatchingPart(path, array) {
    const pathArray = path ? path.split('/') : null;
    const matchingItems = [];

    for (const item of array) {
        if (pathArray && pathArray.includes(item)) {
            matchingItems.push(item);
        }
    }

    if (matchingItems.length === 0) {
        return null;
    }

    const matchingPart = matchingItems.join('/');
    return matchingPart;
}