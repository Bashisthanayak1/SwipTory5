import React, { useState, useEffect } from 'react'
import Hamburger from 'hamburger-react'
import Mobilepagenavbar from './navbarForMobile.js'
import Register from '../../RegisterPopUp/RegisterPopUp.js'
import Login from "../../LoginPopUP/LoginPopUp.js"
import NavbarAfterSignIN from '../../LoginPopUP/NavbarAfterSignIN.js'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const Navigate = useNavigate();

  //usestate for Humberger icon
  const [IsHamburgerClicked, setIsHamburgerClicked] = useState(false);
  // usestate for registration button
  const [IsRegisterClicked, setRegisterClicked] = useState(false)
  // usestate for Sign button
  const [IsSignInClicked, setSignInClicked] = useState(false)

  //checking isuser loggedin and its name saved in session storage
  const [isNameSaves, setnamesaves] = useState(false)

  const Username_from_sessionStorage = sessionStorage.getItem("username");

  useEffect(() => {
    if (Username_from_sessionStorage) {
      // console.log('Is_UserName_saved- ', isNameSaves);
      setnamesaves(true);

    }
  }, [isNameSaves, Username_from_sessionStorage]); // Add isNameSaves to the dependency array


  function ClickHamburger() {
    setIsHamburgerClicked((pre) => !pre)
  }

  // register button
  function registerButton() {
    //setting true to show the registerpop-up when i click it.
    setRegisterClicked((pre) => true)
  }

  //Sign button
  function SignInButton() {
    //setting true to show the loginin up when i click it.
    setSignInClicked((pre) => {
      return true
    })
  }

  return (
    <div className='navbar--container'>
      <nav className='navbar'>
        <h2 onClick={() => Navigate("/")}>SwipTory</h2>
        <div>


          {isNameSaves ?
            <NavbarAfterSignIN username={Username_from_sessionStorage} setnamesaves={setnamesaves} />
            :
            <>
              <button onClick={registerButton} className='Reg_Sig--Large--page'>Register Now</button>
              <button onClick={SignInButton} className='Reg_Sig--Large--page'>Sign In </button>
            </>
          }

        </div>
      </nav>

      <div className="Hamburger" onClick={ClickHamburger}>
        {!isNameSaves && <Hamburger toggled={false} toggle={false} />}
      </div>
      {/* when i click the Hamburger register and login options will show.(for small screen) */}
      {IsHamburgerClicked && <Mobilepagenavbar setIsHamburgerClicked={setIsHamburgerClicked} />}
      {/* when i click the register button a register popUp will show */}
      {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked} />}
      {/* when i click the login/signin button a login  popUp will show */}
      {IsSignInClicked && <Login setSignInClicked={setSignInClicked} />}
    </div>
  )
}

export default Navbar