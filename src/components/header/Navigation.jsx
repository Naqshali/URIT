"use client";
import navigation from "@/data/navigation";
import { isActiveNavigation } from "@/utils/isActiveNavigation";

import Link from "next/link";
import { usePathname } from "next/navigation";
import signUpStore from "@/store/signUp";

export default function Navigation() {
  const path = usePathname();
  const { loggedInUser } = signUpStore();

  const showNavigationItem = (navItem) => {
    return (
      (loggedInUser?.userType === "CLIENT" &&
        (navItem.key === "services" ||
          navItem.key === "home" ||
          navItem.key === "my_profile" ||
          navItem.key === "contact" ||
          navItem.key === "freelancers" ||
          navItem.key === "notification")) ||
      (loggedInUser?.userType === "SERVICE_PROVIDER" &&
        (navItem.key === "projects" ||
          navItem.key === "my_profile" ||
          navItem.key === "home" ||
          navItem.key === "contact" ||
          navItem.key === "notification")) ||
      (!loggedInUser && (navItem.key === "home" || navItem.key === "contact"))
    );
  };

  return (
    <>
      <ul
        className={`ace-responsive-menu ui-navigation ${
          path == "/home-3" || path == "/home-4" || path == "/home-10"
            ? "menu-without-paddingy"
            : ""
        } `}
      >
        {navigation.map((item, i) => (
          <li
            key={i}
            className={`visible_list menu-active ${
              item.id == 1 ? "home-menu-parent" : ""
            } `}
          >
            {item.children ? (
              <a
                className={`list-item  ${
                  isActiveNavigation(path, item) ? "ui-active" : ""
                }`}
              >
                <span className="title">{item.name}</span>{" "}
                {item.children && <span className="arrow "></span>}
              </a>
            ) : (
              <div>
                {showNavigationItem(item) && (
                  <Link
                    href={item.path}
                    className={`list-item ${
                      item.path === path ? "ui-active" : ""
                    }`}
                  >
                    <span className="title">{item.name}</span>
                  </Link>
                )}
              </div>
            )}

            {item.children && (
              <ul className={`sub-menu ${item.id == 1 ? "home-menu" : ""} `}>
                {item.children?.map((item2, i2) => (
                  <li
                    key={i2}
                    className={`menu-active ${
                      isActiveNavigation(path, item2) || item2.path === path
                        ? "ui-child-active"
                        : ""
                    }`}
                  >
                    {item2.children ? (
                      <a>
                        <span className="title">{item2.name}</span>
                        {item2.children && <span className="arrow "></span>}
                      </a>
                    ) : (
                      <Link href={item2.path}>
                        <span className="title">{item2.name}</span>
                      </Link>
                    )}

                    {item2.children && (
                      <ul className="sub-menu">
                        {item2.children?.map((item3, i3) => (
                          <li
                            key={i3}
                            className={
                              item3.path === path ||
                              item3.path === path.replace(/\/\d+$/, "")
                                ? "ui-child-active"
                                : ""
                            }
                          >
                            <Link href={item3.path}>{item3.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
