import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { SecondaryMenus } from '@/helpers/menus';

const SubHeader = props => {
    let menus = SecondaryMenus()

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light py-0 heading-nav  row justify-content-center m-0">
                <div className="col-lg-11">
                    <div>
                        <ul className="navbar-nav me-auto d-flex flex-row gap-3 align-items-center">
                            {menus.length > 0 &&
                                menus?.map((item, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className={`nav-item ${pathname === item.href ? "current" : ""
                                                }`}
                                        >
                                            <Link className="nav-link" href={item.href}>
                                                {item.li}
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

SubHeader.propTypes = {

};

export default SubHeader;