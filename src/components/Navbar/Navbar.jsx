import React, { useState } from "react";
//styles
import "./Navbar.css";
//router
import { Link } from "react-router-dom";
//assets
import menuIcon from "../../assets/menu.svg";
import settingsIcon from "../../assets/settings.svg";
import closeIcon from "../../assets/close.svg";
import logoIcon from "../../assets/logo.svg";

const NavList = ({ ulClasses, liClasses, toggleNav }) => {
    const array = ["shops", "collections", "employees", "expenses"];
    let itemNo = 1;
    const displayLinks = () => {
        return array.map((item) => {
            return (
                <li
                    className={liClasses}
                    style={{ transitionDelay: `${itemNo++ * 100}ms` }}
                    key={`link-${itemNo}`}
                >
                    <Link to={`/${item}_dashboard`}>{item}</Link>
                </li>
            );
        });
    };
    return (
        <ul className={ulClasses} onClick={toggleNav}>
            <span className="navCenter">{displayLinks()}</span>
            {liClasses.includes("navLinks-sm") && (
                <>
                    <li
                        className={liClasses}
                        style={{
                            transitionDelay: `${(array.length + 1) * 100}ms`,
                        }}
                    >
                        <img src={settingsIcon} />
                    </li>
                    <li
                        className={liClasses}
                        style={{
                            transitionDelay: `${(array.length + 2) * 100}ms`,
                        }}
                    >
                        <img src={closeIcon} />
                    </li>
                </>
            )}
        </ul>
    );
};

const Navbar = () => {
    //states
    const [navLinkPosition, setNavlinkPosition] = useState("linkOut");
    const [navListPosition, setNavListPosition] = useState("navListOut");

    //functions
    const handleClick = () => {
        const pos = navLinkPosition === "linkOut" ? "linkIn" : "linkOut";
        const navListPos =
            navListPosition === "navListOut" ? "navListIn" : "navListOut";
        setNavlinkPosition(pos);
        setNavListPosition(navListPos);
    };

    return (
        <nav className="bg-semi-dark-blue">
            <span className="navLeft">
                <Link to={`/`}>
                    <span className="flex flex-col items-center justify-center gap-1">
                        <img
                            src={logoIcon}
                            alt="logo icon"
                            className="w-[50px]"
                        />
                        <span className="text-[10px] uppercase">
                            <span className="text-primary">rajmudra</span>
                            <span>{" food "}</span>
                            <span>junction</span>
                        </span>
                    </span>
                </Link>
            </span>
            {/* <NavList
                ulClasses="navList navList-bg"
                liClasses="navLinks navLinks-bg hoverAction"
            /> */}
            <NavList
                toggleNav={handleClick}
                ulClasses={`navList navList-sm ${navListPosition}`}
                liClasses={`navLinks navLinks-sm ${navLinkPosition}`}
            />
            <span className="navRight">
                <li
                    className={"navLinks"}
                    // style={{ transitionDelay: `${(array.length + 1) * 100}ms` }}
                >
                    <img src={settingsIcon} />
                </li>
            </span>
            <img className="menuIcon" src={menuIcon} onClick={handleClick} />
        </nav>
    );
};

export default Navbar;
