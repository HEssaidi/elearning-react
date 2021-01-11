import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import logo from '../../logo.svg';
import { Link } from "react-router-dom";

const Nav = styled.nav`
    width: 100%;
    height: 66px;
    background-color: #ffffff;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;

    -webkit-box-shadow: 0 8px 6px -6px #999;
    -moz-box-shadow: 0 8px 6px -6px #999;
    box-shadow: 0 8px 6px -6px #999;

    .logo {
        padding: 15px 0;
    }
`;

const myStyle = {
    position: "fixed",
    paddingTop: 8,
    zIndex: "1000"
};

function Navbar(props) {
    return (
        <Nav style={myStyle}>
            {/* <Link to="/"> */}
            <img src={logo} width="140" height="50" className="d-inline-block align-top" alt="logo" />
            {/* <img
                src="images/react_logo.png"
                width="140"
                height="50"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
            /> */}
            {/* </Link> */}
            <Burger
                user={props.user} isLoggedIn={props.isLoggedIn}
            />
        </Nav>
    );
}

export default Navbar;
