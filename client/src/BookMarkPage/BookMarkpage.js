import React, { useEffect, useState } from "react";
import Navbar from "../PagesJS/Navbar/navbar";
import "../BookMarkPage/BookMarkPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BookMarkpage = () => {
  let Navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const originURL = "https://swiptory5backend.onrender.com";

  const username = sessionStorage.getItem("username");

  const [foodArray, setFoodArray] = useState([]);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  useEffect(() => {
    async function gettingAllBookmarkId() {
      try {
        const result = await axios.get(
          `${originURL}/AUserBookmark/${username}`
        );
        const arrayofSlideID = result.data.bookmarkedslide;

        // Use Promise.all to wait for all requests to complete
        const arrOfSlides = await Promise.all(
          arrayofSlideID.map(async (obj, index) => {
            const response = await axios.get(
              `${originURL}/AutoSlider/${obj.id}`
            );
            return response.data; // Assuming you want to store the data of each request
          })
        );
        setFoodArray(arrOfSlides);
        console.log("arrOfSlides:- ", arrOfSlides);
      } catch (error) {
        console.log("gettingAllBookmarkId error-: ", error);
        // Handle errors here, e.g., show an error message to the user
      }
    }

    gettingAllBookmarkId();
  }, [username]);

  // let arr = [];

  function divTOprint() {
    return foodArray.map((arr, index) => (
      <div
        className="DIv--OfA--slide"
        key={index}
        onClick={() => ClkSlideDIV(index)}
      >
        <img src={arr[0].aslide[0].Add_Image_URL} alt="img" />
        <h3>{arr[0].aslide[0].Your_heading}</h3>
        <h2>{arr[0].aslide[0].Story_Description}</h2>
      </div>
    ));
  }

  function clickShowMore() {
    setShowMoreClicked((prev) => !prev);
  }

  //when we click slide div to open slider
  function ClkSlideDIV(i) {
    console.log("sliderdiv clicked", `index- ${i}`);
    const clickedArray_of_obj_id = foodArray[i][0]._id;
    console.log("Clicked arrayOfObject _id:- ", clickedArray_of_obj_id);

    //Navigate to slide page
    Navigate(`/AutoSlider/${clickedArray_of_obj_id}`);
  }

  return (
    <div>
      <Navbar />
      {username ? (
        <>
          <h1 className="yourBookMark--text">Your Bookmarks </h1>

          <div
            className="Food--page--container"
            style={{
              overflow: showMoreClicked ? "visible" : "hidden",
              height: showMoreClicked ? "auto" : "500px",
            }}
          >
            {!foodArray.length > 1 && (
              <h3 className="No--stories--h3">No stories Available</h3>
            )}

            {foodArray.length >= 1 && divTOprint()}
          </div>
          {(foodArray.length > 4 ||
            (foodArray.length > 4 && windowWidth < 1230)) && (
            <button onClick={clickShowMore} className="showmore--button">
              {showMoreClicked ? "hide" : "Show more..."}
            </button>
          )}
        </>
      ) : (
        <h1 className="Login--to--see--Bookmark">
          Please Login to see your Bookmarks
        </h1>
      )}
    </div>
  );
};

export default BookMarkpage;
