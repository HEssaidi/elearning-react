import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;

    li {
        padding: 18px 10px;
    }

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #0d2538;
        position: fixed;
        transform: ${({ open }) =>
        open ? "translateX(0)" : "translateX(100%)"};
        top: 0;
        right: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;

        li {
            color: #fff;
        }
    }
`;

const myStyle = {
    position: "fixed",
    zIndex: "9999"
};



// function NavBarConnected(props) {
//     return (
//         <Ul open={props.open}>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/">
//                     Accueil
//                 </Link>
//             </li>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/upload">
//                     Stocker un objet
//                 </Link>
//             </li>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/recherche">
//                     Touver des objets
//                 </Link>
//             </li>
//             <li>
//                 <Link
//                     onClick={() => logoutUser()}
//                     style={{ textDecoration: "none", color: "Gray" }}
//                     to="/login"
//                 >
//                     Se déconnecter
//                 </Link>
//             </li>
//         </Ul>
//     );
// }

// function NavBarNotConnected(props) {
//     return (
//         <Ul open={props.open}>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/">
//                     Accueil
//                 </Link>
//             </li>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/upload">
//                     Stocker un objet
//                 </Link>
//             </li>
//             <li>
//                 <Link style={{ textDecoration: "none", color: "Gray" }} to="/recherche">
//                     Touver des objets
//                 </Link>
//             </li>
//             <li>
//                 <Link
//                     style={{ textDecoration: "none", color: "Gray" }}
//                     to="/signup"
//                 >
//                     S'inscrire
//                 </Link>
//             </li>
//             <li>
//                 <Link
//                     style={{ textDecoration: "none", color: "Gray" }}
//                     to="/login"
//                 >
//                     Se connecter
//                 </Link>
//             </li>
//         </Ul>
//     );
// }

export default function RightNav(props) {

    function logoutUser() {
        let appStorage = {
            isLoggedIn: false,
            user: {}
        };
        localStorage["authStorage"] = JSON.stringify(appStorage);
        window.location.reload();

        // this.setState(appStorage);
    }

    return (
        <Ul open={props.open}>
            <li>
                <Link style={{ textDecoration: "none", color: "Gray" }} to="/">
                    Accueil
                </Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none", color: "Gray" }} to="/upload">
                    Stocker un objet
                </Link>
            </li>
            <li>
                <Link style={{ textDecoration: "none", color: "Gray" }} to="/recherche">
                    Touver des objets
                </Link>
            </li>

            {props.isLoggedIn ?
                <React.Fragment>
                    <li>
                        <Link
                            style={{ textDecoration: "none", color: "Gray" }}
                            to="/"
                        >
                            {props.user.nom} {props.user.prenom}
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={() => logoutUser()}
                            style={{ textDecoration: "none", color: "Gray" }}
                        // to="/login"
                        >
                            Se déconnecter
                        </Link>
                    </li>
                </React.Fragment>
                :
                <React.Fragment>
                    <li>
                        <Link
                            style={{ textDecoration: "none", color: "Gray" }}
                            to="/signup"
                        >
                            S'inscrire
                </Link>
                    </li>
                    <li>
                        <Link
                            style={{ textDecoration: "none", color: "Gray" }}
                            to="/login"
                        >
                            Se connecter
                </Link>
                    </li>
                </React.Fragment>
            }

        </Ul>
    );
    // useEffect(() => { }, []);
    // if (props.isLoggedIn) {
    //     return NavBarConnected(props);
    // } else {
    //     return NavBarNotConnected(props);
    // }
}
