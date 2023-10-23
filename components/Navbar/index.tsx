import { CRASH_STORE_LOGO, PROFILE_ICON } from "@/constants/IMAGE_PATHS";
import Image from "next/image";
import { useEffect, useState } from "react";
import { logout } from "../../utils/utils";
import styles from "./navbar.module.scss";

import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
  UncontrolledDropdown,
} from "reactstrap";

function CustomNavbar(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState("");
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("crash-Token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <>
      <Navbar {...args} expand="md" className={styles.navbarContainer}>
        <NavbarBrand href="/">
          <Image src={CRASH_STORE_LOGO} width={100} height={80} alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="me-3">
                Ashraf Khan
                <Image
                  src={PROFILE_ICON}
                  alt="profile-icon"
                  width={16}
                  height={16}
                  className="ms-2 me-1"
                />
              </DropdownToggle>
              <DropdownMenu right>
                {token ? (
                  <DropdownItem onClick={logout}>Logout</DropdownItem>
                ) : (
                  <>
                    <DropdownItem href="/auth/signin">Login</DropdownItem>
                    <DropdownItem href="/auth/signup">Signup</DropdownItem>
                  </>
                )}
                <DropdownItem href="/auth/signup">WishList</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavbarText>
        </Collapse>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
