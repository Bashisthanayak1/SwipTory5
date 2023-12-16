import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Foodpage/FoodPage.css";
import axios from "axios";

const Moviepage = () => {
  let Navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const originURL = "https://swiptory5backend.onrender.com";

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
    async function foodFunction() {
      try {
        const foodData = await axios.get(
          `${originURL}/FilterACategoryData?Acategory=movie`
        );
        // setFoodArray(foodData.data.categorydata[0].aslide);
        setFoodArray(foodData.data.categorydata);
      } catch (error) {
        console.error(error);
      }
    }
    foodFunction();
  }, []);
  // console.log('foodData:- ', foodArray);

  let arr = [];
  function divTOprint() {
    //for array of objects and each onjects has an array in which
    foodArray.map((obj, index) => {
      return arr.push(
        <div
          className="DIv--OfA--slide"
          key={index}
          onClick={() => ClkSlideDIV(index)}
        >
          <img src={obj.aslide[0].Add_Image_URL} alt="img" key={index} />
          <h3>{obj.aslide[0].Your_heading}</h3>
          <h2>{obj.aslide[0].Story_Description}</h2>
        </div>
      );
    });
    return arr;
  }

  function clickShowMore() {
    setShowMoreClicked((prev) => !prev);
  }

  //when we click slide div to open slider
  function ClkSlideDIV(i) {
    console.log("sliderdiv clicked", `index- ${i}`);
    const clickedArray_of_obj_id = foodArray[i]._id;
    console.log("Clicked arrayOfObject _id:- ", clickedArray_of_obj_id);

    //Navigate to slide page
    Navigate(`/AutoSlider/${clickedArray_of_obj_id}`);
  }

  return (
    <>
      <div
        className="Food--page--container"
        style={{
          overflow: showMoreClicked ? "visible" : "hidden",
          height: showMoreClicked ? "auto" : "500px",
        }}
      >
        <h1 className="About--food--h1">Top Stories About movie</h1>
        {!foodArray.length >= 1 && (
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
  );
};

export default Moviepage;
