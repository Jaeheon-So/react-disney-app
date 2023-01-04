import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import styled from "styled-components";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const Nav = () => {
  const query = useQuery();
  const q = query.get("q");
  const [show, handleShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState(q || "");
  const navigate = useNavigate();
  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userData, setUserData] = useState(initialUserData);

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const handleLogOut = () => {
    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("userData");
          setUserData({});
          navigate("/");
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/") navigate("/main");
      } else {
        if (pathname !== "/")
          if (!localStorage.getItem("userData")) alert("로그인 해주세요");
        navigate("/");
      }
    });
  }, [auth, pathname, navigate]);

  useEffect(() => {
    if (q) setSearchValue(q);
    if (pathname === "/main") setSearchValue("");
  }, [q, pathname]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) handleShow(true);
      else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          alt="Disney Plus Logo"
          src="/images/logo.svg"
          onClick={() => {
            navigate("/");
          }}
        />
      </Logo>
      {pathname !== "/" && (
        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleLogOut}>Sign out</span>
          </DropDown>
        </SignOut>
      )}
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleChange}
            className="nav__input"
            type="text"
            placeholder="영화를 검색해주세요!!!"
          />
        </>
      )}
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 90px;
  background-color: ${(props) => (props.show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 36px; */
  padding: 0 calc(3.5vw + 5px);
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.div`
  padding: 0;
  width: 80px;
  /* margin-top: 4px; */
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
  font-size: 18px;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 75px;
  right: 0px;
  text-align: center;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  visibility: hidden;
  opacity: 0;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  padding: 14px 0;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  &:hover {
    ${DropDown} {
      visibility: visible;
      opacity: 1;
      transition-duration: 0.5s;
    }
  }
`;

export default Nav;
