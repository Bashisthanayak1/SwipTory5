import React, { useState } from 'react'
import Register from '../../RegisterPopUp/RegisterPopUp';
import Login from '../../LoginPopUP/LoginPopUp';

const Mobilepagenavbar = (props) => {
    // usestate for registration button
    const [IsRegisterClicked, setRegisterClicked] = useState(false)
    // usestate for Sign button
    const [IsSignInClicked, setSignInClicked] = useState(false)
    //using for x to close the mobile popup
    const [IsXClicked, setIsXClicked] = useState(true)
    // register button
    function registerButton() {
        //opening registration box pop-up
        setRegisterClicked((pre) => true)
        //closing Mobilenav popup
        setIsXClicked(false)

    }

    //Sign button
    function SignInButton() {
        //opening signin box popup
        setSignInClicked((pre) => true)
        //closing Mobilenav popup
        setIsXClicked(false)
    }

    function clickPopUpX() {
        setIsXClicked(false)
        props.setIsHamburgerClicked(() => false)

    }

    return (
        <>
            {IsRegisterClicked && <Register setRegisterClicked={setRegisterClicked} />}
            {IsSignInClicked && <Login setSignInClicked={setSignInClicked} />}
            {IsXClicked && <div className='Navbar--for--Mobile' >
                <div className='mobile__popUp_X' onClick={clickPopUpX}>X</div>
                <div>
                    <button onClick={registerButton}>Register Now</button>
                    <button onClick={SignInButton}>Sign In</button>
                </div>
            </div>}

        </>

    )
}

export default Mobilepagenavbar