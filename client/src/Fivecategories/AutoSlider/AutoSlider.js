import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../AutoSlider/AutoSlider.css";
import Navbar from "../../PagesJS/Navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlueBoobkMark from "../../SVG/bookmarksolid.svg";
import WhiteBoobkMark from "../../SVG/bookmark_solidwhite.svg";
import Redheart from "../../SVG/heart-solidRed.svg";
import Whiteheart from "../../SVG/heart-solid_White.svg";
import axios from "axios";
import Login from "../../LoginPopUP/LoginPopUp";

const AutoSlider = (props) => {
  const Navigate = useNavigate();
  // axios.defaults.withCredentials = true;
  const originURL = "http://localhost:8000";

  // getting user Username from SS for a simple check is user logged in or not
  const username_from_sl = sessionStorage.getItem("username");

  const [AddBlueBookMark, setAddBlueBookMark] = useState(false);
  const [images, setImages] = useState([
    {
      Add_Image_URL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif",
      Select_category: "food",
      Story_Description: "food",
      Your_heading: "food",
    },
    {
      Add_Image_URL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif",
      Select_category: "food",
      Story_Description: "food",
      Your_heading: "food",
    },
    {
      Add_Image_URL:
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/b6e0b072897469.5bf6e79950d23.gif",
      Select_category: "food",
      Story_Description: "food",
      Your_heading: "food",
    },
  ]);
  const [likesarray, setLikesarray] = useState([]);
  const [isloggedinUserLikedOpenedSlide, setisloggedinUserLikedOpenedSlide] =
    useState(false);
  const [addRedheart, setAddRedheart] = useState(false);
  const [IsSignInClicked, setSignInClicked] = useState(false);
  // *****************************************************************************************************//

  //acessing the id we are getting from URL
  const { id } = useParams();
  //console.log('URL ID: - ', id);

  // *****************************************************************************************************//

  // click heart icon for like

  const clickHeart = useCallback(async () => {
    if (!username_from_sl) {
      console.log("loggin first");
      return setSignInClicked(true);
    }
    console.log("heart clicked");
    console.log(
      "isloggedinUserLikedOpenedSlide:- ",
      isloggedinUserLikedOpenedSlide
    );
    try {
      if (isloggedinUserLikedOpenedSlide) {
        const Deleteresponse = await axios.delete(`${originURL}/delete`, {
          data: { id, username_from_sl },
        });
        console.log("clickHeart Deleteresponse:- ", Deleteresponse);
        setAddRedheart(false);
        setisloggedinUserLikedOpenedSlide(false);
      } else {
        const StoreResponse = await axios.post(`${originURL}/storeLikes`, {
          id,
          username_from_sl,
        });
        console.log("clickHeart StoreResponse:- ", StoreResponse);
        console.log("like  stored");
        setAddRedheart(true);
        setisloggedinUserLikedOpenedSlide(true);
      }
    } catch (error) {
      console.log("clickHeart error- ", error);
    }
  }, [isloggedinUserLikedOpenedSlide, id, username_from_sl]);

  // *****************************************************************************************************//

  useEffect(() => {
    // getting the slider array by the id ,getting from URL
    async function dataFromId() {
      try {
        let slideData = await axios.get(`${originURL}/AutoSlider/${id}`);
        setImages(slideData.data[0].aslide);
        // console.log('slideData_from_id - ', slideData);
        const LikeArray = await slideData.data[0].aslidelikearry;
        //getting full likes array for setting likes count
        setLikesarray(LikeArray);

        //to check if the logged in user liked the  opened slide  or  not
        const isCurrentUserAlreadyLiked = await LikeArray.some(
          (obj) => obj.username === username_from_sl
        );
        if (isCurrentUserAlreadyLiked && username_from_sl) {
          setisloggedinUserLikedOpenedSlide(true);
          setAddRedheart(true);
        } else {
          // console.log('isCurrentUserLiked:- ', isCurrentUserLiked);
          setisloggedinUserLikedOpenedSlide(false);
          setAddRedheart(false);
        }
      } catch (error) {
        console.log("dataFromId error:- ", error);
      }
    }

    dataFromId();
  }, [id, setImages, clickHeart, username_from_sl]);

  // *****************************************************************************************************//
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progressWidths, setProgressWidths] = useState(images.map(() => "0%"));

  const updateProgress = useCallback(() => {
    setProgressWidths((prevProgressWidths) =>
      prevProgressWidths.map((_, index) =>
        index === currentIndex ? "100%" : "0%"
      )
    );
    setTimeout(() => {
      setProgressWidths((prevProgressWidths) =>
        prevProgressWidths.map((_, index) =>
          index === currentIndex ? "0%" : "0%"
        )
      );
    }, 50);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    updateProgress();
  }, [images.length, updateProgress]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    updateProgress();
  }, [images.length, updateProgress]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex, nextSlide]);

  // *****************************************************************************************************//

  //Auto slider closing x sigh
  function autoSliderX() {
    Navigate("/");
  }
  // *****************************************************************************************************//

  //click share icon for copy
  async function clickForCopy() {
    try {
      //  Clipboard API to copy text
      await navigator.clipboard.writeText(window.location.href);
      toast.success("copied!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Unable to copy URL:", error);
    }
  }

  // *****************************************************************************************************//

  //clickBookmark
  async function clickBookmark() {
    console.log("BookMarkClicked");
    try {
      const successfully_bookMark_added = await axios.post(
        `${originURL}/saveBookmark`,
        { id, username_from_sl }
      );
      console.log(
        "successfully_bookMark_added or not :- ",
        successfully_bookMark_added.data.addedslideId
      );
      if (successfully_bookMark_added.data.addedslideId) {
        setAddBlueBookMark((pre) => true);
      } else {
        setAddBlueBookMark((pre) => false);
      }
    } catch (error) {
      console.log("clickBookmark api error:- ", error);
    }
  }

  // *****************************************************************************************************//
  useEffect(() => {
    async function isBookamrkAvailable() {
      try {
        const username = username_from_sl;
        //sending id and user name to check if openedslide bookmarked or not
        const response = await axios.get(
          `${originURL}/getAllBookmarks/${id}/${username}`
        );
        const BookmarkPresent = response.data.isObjectIdPresent;
        // console.log('IsBookMarkPresent:- ', BookmarkPresent);

        if (BookmarkPresent) {
          // if already stored add blue color
          setAddBlueBookMark(true);
        } else {
          setAddBlueBookMark(false);
        }
      } catch (error) {
        console.log("isBookamrkAvailable error-: ", error);
      }
    }
    isBookamrkAvailable();
  }, [id, username_from_sl, Navigate]);
  // *****************************************************************************************************//

  return (
    <>
      {IsSignInClicked && <Login setSignInClicked={setSignInClicked} />}
      <Navbar className="navbar--in--AUtoSlider" />
      <ToastContainer />

      <div className="div--black--shadow">
        <div className="The--main--container">
          <div className="slider-container">
            <p className="X--for--close--autoSlider" onClick={autoSliderX}>
              X
            </p>
            <i className="fa-solid fa-paper-plane" onClick={clickForCopy}></i>

            <div
              className="slider"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: `transform 0.5s ease-in-out`,
              }}
            >
              {images.map((obj, index) => (
                <>
                  <div key={index} className="slide" style={{ width: "100%" }}>
                    <img
                      src={obj.Add_Image_URL}
                      alt={obj.Your_heading}
                      style={{ width: "100%" }}
                      key={index}
                    />
                  </div>
                </>
              ))}
            </div>

            <div className="progress-container">
              {images.map((obj, index) => (
                <div
                  key={index}
                  className={`progress-bar ${
                    index === currentIndex ? "active" : ""
                  }`}
                  style={{ width: progressWidths[index] }}
                ></div>
              ))}
            </div>

            <div className="controls">
              <button onClick={prevSlide}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button onClick={nextSlide}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <img
              src={AddBlueBookMark ? BlueBoobkMark : WhiteBoobkMark}
              alt="Bookmark"
              id="AutoSlider--bookmark"
              onClick={clickBookmark}
            />

            <div id="HearatIcon--div">
              <img
                src={addRedheart ? Redheart : Whiteheart}
                alt="Heart"
                className="heartIcon"
                onClick={clickHeart}
              />
              <h3 className="Heart--count">{likesarray.length}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoSlider;
