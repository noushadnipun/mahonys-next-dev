import React, {useEffect, useState} from "react";
import {findMatchingPart, SecondaryMenus} from "@/helpers/menus";
import {useRouter} from "next/router";
import Link from "next/link";

const SubHeader = ({subHeader}) => {
  const router = useRouter()
  const [menus, setMenus] = useState([])
  const currentPathname = router.pathname;
  const prefix = '/organization/smith'
  useEffect(() => {
      setMenus(SecondaryMenus(currentPathname)['submenu'])
  }, [currentPathname])

    const activeClass = (pathName) => {
        let match =findMatchingPart(router.pathname, [pathName.toLowerCase()])
        return match ? 'current' : ''
    }

  return (
    <nav className="navbar navbar-expand-lg navbar-light py-0 heading-nav  row justify-content-center m-0">
      <div className="col-lg-11">
        <div>
            {subHeader ?
                subHeader :
                <ul className="navbar-nav me-auto d-flex flex-row gap-3 align-items-center">
                    {menus &&
                        menus.map((menuItem, index) => (
                            <li className={`nav-item ${activeClass(menuItem.name)}`} key={index}>
                                <Link href={prefix+menuItem.url} className="nav-link xlabel">
                                    {menuItem.label}
                                </Link>
                            </li>
                        ))}
                    {/*<li className="nav-item current">*/}
                    {/*  <a className="nav-link" href="">*/}
                    {/*    All*/}
                    {/*  </a>*/}
                    {/*</li>*/}
                </ul>
            }

        </div>
      </div>
    </nav>
  );
};

export default SubHeader;
