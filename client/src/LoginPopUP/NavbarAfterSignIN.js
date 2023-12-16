import React, { useState } from "react";
import Hamburger from "hamburger-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const NavbarAfterSignIN = (props) => {
  const Navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const originURL = "https://swiptory5backend.onrender.com";

  const [shouldShowInfo, setshouldShowInfo] = useState(false);
  //addstory popUp state
  const [openAddStory, setOpenAddStory] = useState(false);
  //defining state of an array
  const [slideToPrint, setSlideToPrint] = useState([1, 1, 1]);
  //adding divs border-color if it is clicked
  const [SlideIsClicked, setSlideIsClicked] = useState(null);

  //story details
  const [storyDetails, setStoryDetails] = useState({
    Your_heading: "",
    Story_Description: "",
    Add_Image_URL: "",
    Select_category: "",
  });
  //saving all details in an array
  let arrayForSlides = JSON.parse(sessionStorage.getItem("slideDetails")) || {
    aslide: [],
  };

  // ***************************************************************
  function ClkForInfoAndLogout() {
    setshouldShowInfo((pre) => !pre);
  }
  // ***************************************************************

  //logout
  function ClickLogout() {
    console.log("clicking logout");
    sessionStorage.clear("username");
    props.setnamesaves(false);
  }

  // ***************************************************************

  //function to addstory click
  function ClickAddStory() {
    console.log("ADdbutton-clicked");
    setOpenAddStory((pre) => !pre);
  }

  // ***************************************************************

  //x - for closing add story popup
  function AddStoryX() {
    //closing addstory popup when click X.
    setOpenAddStory((pre) => !pre);
    setSlideToPrint((pre) => [1, 1, 1]);
  }
  // ***************************************************************

  //function runs when we click Add+ button

  function AddStorySlideButton() {
    setTimeout(() => {
      setSlideToPrint((prev) => [...prev, 1]);
    }, 100);
  }

  // ***************************************************************

  function slideButtonCross(i) {
    if (slideToPrint.length > 3) {
      setTimeout(() => {
        setSlideToPrint((prev) => prev.filter((_, index) => index !== i));
      }, 500);
    }
  }

  // ***************************************************************

  //filling slide details and updating as we input/type.
  function fill_slide_Details(event) {
    const { name, value } = event.target;
    setStoryDetails({
      ...storyDetails,
      slideIndex: SlideIsClicked || 0,
      [name]: value,
    });
  }
  // ***************************************************************
  // modifying state if slide is clicked -for adding its border color
  function Onclick__function_ForA_slide(i) {
    console.log(i);
    console.log(arrayForSlides);
    //helps to indentify div for adding border color
    setSlideIsClicked(i);
    //checking if the array is empty or not
    if (arrayForSlides && arrayForSlides.aslide.length > 0) {
      //if empty
      const AvailableInTheArray = arrayForSlides.aslide.find(
        (obj) => obj.slideIndex === i
      );
      if (AvailableInTheArray) {
        console.log(AvailableInTheArray);
        setStoryDetails({
          Your_heading: AvailableInTheArray.Your_heading,
          Story_Description: AvailableInTheArray.Story_Description,
          Add_Image_URL: AvailableInTheArray.Add_Image_URL,
          Select_category: AvailableInTheArray.Select_category,
          slideIndex: i,
        });
      } else {
        if (
          storyDetails.Your_heading.length > 1 &&
          storyDetails.Story_Description.length > 1 &&
          storyDetails.Add_Image_URL.length > 1 &&
          storyDetails.Select_category.length > 1
        ) {
          //checking if the pbject with same slideIndex is in the array of object or not
          const isObjectInArray = arrayForSlides.aslide.find(
            (obj) => obj.slideIndex === storyDetails.slideIndex
          );
          console.log("isObjectInArray- ", isObjectInArray);
          if (!isObjectInArray) {
            arrayForSlides.aslide.push(storyDetails);
            sessionStorage.setItem(
              "slideDetails",
              JSON.stringify(arrayForSlides)
            );
            setStoryDetails({
              Your_heading: "",
              Story_Description: "",
              Add_Image_URL: "",
              Select_category: "",
              slideIndex: i,
            });
          } else {
            setStoryDetails({
              Your_heading: "",
              Story_Description: "",
              Add_Image_URL: "",
              Select_category: "",
              slideIndex: i,
            });
          }
          //everything ok
        } else {
          setStoryDetails({
            Your_heading: "",
            Story_Description: "",
            Add_Image_URL: "",
            Select_category: "",
            slideIndex: i,
          });
        }
      }
    } else {
      //if array is empty add filled details into the array
      // array.push(storyDetails)
      if (
        storyDetails.Your_heading.length > 1 &&
        storyDetails.Story_Description.length > 1 &&
        storyDetails.Add_Image_URL.length > 1 &&
        storyDetails.Select_category.length > 1
      ) {
        arrayForSlides.aslide.push(storyDetails);
        sessionStorage.setItem("slideDetails", JSON.stringify(arrayForSlides));
        setStoryDetails({
          Your_heading: "",
          Story_Description: "",
          Add_Image_URL: "",
          Select_category: "",
          slideIndex: i,
        });
      } else {
        setStoryDetails({
          Your_heading: "",
          Story_Description: "",
          Add_Image_URL: "",
          Select_category: "",
          slideIndex: i,
        });
      }
    }
  }

  // ***************************************************************
  //clicking post for posting details
  function ClickPost() {
    if (
      storyDetails.Your_heading.length > 1 &&
      storyDetails.Story_Description.length > 1 &&
      storyDetails.Add_Image_URL.length > 1 &&
      storyDetails.Select_category.length > 1
    ) {
      arrayForSlides.aslide.push(storyDetails);

      sessionStorage.setItem("slideDetails", JSON.stringify(arrayForSlides));

      setStoryDetails({
        Your_heading: "",
        Story_Description: "",
        Add_Image_URL: "",
        Select_category: "",
        slideIndex: SlideIsClicked,
      });
    }

    //accessing array from session storage to check if minimum 3 slides are added or not
    console.log(
      "after clicking postButton ,accessArray- ",
      arrayForSlides.aslide.length
    );

    if (arrayForSlides.aslide.length >= 3) {
      axios
        .post(`${originURL}/AddSlideData`, arrayForSlides)
        .then(() => {
          //after posting clear input tags text
          arrayForSlides.aslide = [];
          setStoryDetails({
            Your_heading: "",
            Story_Description: "",
            Add_Image_URL: "",
            Select_category: "",
            slideIndex: 0,
          });
          //closing the addstory box
          setOpenAddStory((pre) => !pre);
          //closing the popup when  we post
          setshouldShowInfo((pre) => false);
          toast.success("Successfully added", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          sessionStorage.removeItem("slideDetails");
        })
        .catch(() => console.log("unable to add slide data"));
    } else {
      return alert("minimus 3 slides required");
    }
  }

  // ***************************************************************

  //onclick for bookmark
  function GoToBookmarkPage() {
    console.log("bookmarks button clicked");
    Navigate("/BookMarkpage");
  }

  // ***************************************************************

  return (
    <div className="AfterSignIN--div">
      <button className="Bookmarks--button" onClick={GoToBookmarkPage}>
        <i className="fa-solid fa-bookmark"></i> Bookmarks
      </button>
      <button id="Addstory--button" onClick={ClickAddStory}>
        Add story
      </button>
      <img
        className="user__profile_photo"
        src="https://media.istockphoto.com/id/1268548918/vector/white-create-account-screen-icon-isolated-with-long-shadow-red-circle-button-vector.jpg?s=612x612&w=0&k=20&c=tyaWWtW2_yQyvK4hBnVXEt3tfSNr0jVC_6P7XbOBrbk="
        alt=""
      />

      <div onClick={ClkForInfoAndLogout}>
        <Hamburger toggled={false} toggle={false} size={22} />
      </div>

      {shouldShowInfo && (
        <div className="Info--Logout">
          <img
            className="user__profile_photo_smallSCR"
            src="https://media.istockphoto.com/id/1268548918/vector/white-create-account-screen-icon-isolated-with-long-shadow-red-circle-button-vector.jpg?s=612x612&w=0&k=20&c=tyaWWtW2_yQyvK4hBnVXEt3tfSNr0jVC_6P7XbOBrbk="
            alt=""
          />
          <h4>{props.username}</h4>
          <button type="button" className="Three_hidden_button">
            Your Story
          </button>
          <button
            type="button"
            className="Three_hidden_button"
            onClick={GoToBookmarkPage}
          >
            <i className="fa-solid fa-bookmark"></i> Bookmarks
          </button>
          <button
            type="button"
            className="Three_hidden_button"
            onClick={ClickAddStory}
          >
            Add story
          </button>
          <button type="button" id="Logout--button" onClick={ClickLogout}>
            Logout
          </button>
        </div>
      )}
      {/* addstory div */}
      {openAddStory && (
        <div className="Add--story--container">
          <div className="add--story--div">
            <h1 className="add--story--div__cross" onClick={AddStoryX}>
              x
            </h1>
            <div className="slide--button--container">
              {slideToPrint.length > 0 &&
                (() => {
                  let elements = [];
                  for (let i = 0; i < slideToPrint.length; i++) {
                    elements.push(
                      <button
                        onClick={() => Onclick__function_ForA_slide(i)}
                        className={`A--New--Slide  ${
                          SlideIsClicked === i ? "clicked" : ""
                        }`}
                        key={i}
                      >
                        {slideToPrint.length > 3 && (
                          <span onClick={() => slideButtonCross(i)}>x</span>
                        )}
                        slide {i + 1}
                      </button>
                    );
                  }
                  return elements;
                })()}

              {/* disabled={(slideToPrint.length === 3) ? true : false} style={{ cursor: (slideToPrint.length === 3) ? 'not-allowed' : "pointer" }} */}
              <button
                onClick={AddStorySlideButton}
                disabled={slideToPrint.length === 6 ? true : false}
                style={{
                  cursor: slideToPrint.length === 6 ? "not-allowed" : "pointer",
                }}
              >
                Add+
              </button>
            </div>
            <div className="label--inputs--div">
              <label htmlFor="">Heading : </label>
              <input
                onChange={fill_slide_Details}
                type="text"
                placeholder="Your heading"
                name="Your_heading"
                id="Heading--input"
                value={storyDetails.Your_heading}
              />
              <br />
              <label htmlFor="">Description : </label>
              <input
                type="text"
                onChange={fill_slide_Details}
                placeholder="Story Description"
                name="Story_Description"
                value={storyDetails.Story_Description}
              />
              <br />
              <label htmlFor="">Image URL : </label>
              <input
                type="text"
                onChange={fill_slide_Details}
                placeholder="Add Image URL"
                name="Add_Image_URL"
                value={storyDetails.Add_Image_URL}
              />
              <br />
              <label htmlFor="">Category : </label>
              <select
                name="Select_category"
                value={storyDetails.Select_category}
                onChange={fill_slide_Details}
              >
                <option>Select category</option>
                <option value="food">food</option>
                <option value="health and fitness">health and fitness</option>
                <option value="travel">travel</option>
                <option value="movie">movie</option>
                <option value="education">education</option>
              </select>
            </div>
            <br />
            <div id="PRV--NXT--POST--Div">
              <button>Previous</button>
              <button>Next</button>
              <button onClick={ClickPost}>post</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer closeButton={false} />
    </div>
  );
};

export default NavbarAfterSignIN;
