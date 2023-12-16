import React, { useState } from 'react'
import categoriesData from './categoriesData'
import FoodPage from "../../Fivecategories/Foodpage/Foodpage.js"
import Healthpage from '../../Fivecategories/healthFitnesspage/HealthFitness.js'
import Travelpage from '../../Fivecategories/travelpage/TravelPage.js'
import Moviepage from '../../Fivecategories/moviepage/Moviepage.js'
import Educationpage from '../../Fivecategories/educationPage/Educationpage.js'


const Stories = () => {
    // to change divs color as we click
    const [clickedIndex, setClickedIndex] = useState(0);
    const [clickedCategory, setClickedCategory] = useState("All")

    async function clickOnAnyCategory(categoryName, index) {
        console.log("categoryName and index:- ", categoryName, index);
        // adding divs index to add the clicked border color
        setClickedIndex(index);
        setClickedCategory(categoryName)
    }

    return (
        <>
            <div className='categories--container'>
                {categoriesData.map((v, i) =>
                    <div className={`categoryDiv ${clickedIndex === i ? 'clicked' : ''}`} key={i} onClick={() => clickOnAnyCategory(v.Name, i)} >
                        <h1>{v.Name}</h1>
                        <img src={v.Image} alt={v.Name} />
                    </div>)}
            </div>
            {(clickedCategory === "All") &&
                <div>
                    <FoodPage />
                    <Healthpage />
                    <Travelpage />
                    <Moviepage />
                    <Educationpage />
                </div>
            }
            {(clickedCategory === "food") &&
                <div>
                    <FoodPage />
                </div>
            }
            {(clickedCategory === "health and fitness") &&
                <div>
                    <Healthpage />
                </div>
            }
            {(clickedCategory === "travel") &&
                <div>
                    <Travelpage />
                </div>
            }
            {(clickedCategory === "movie") &&
                <div>
                    <Moviepage />
                </div>
            }
            {(clickedCategory === "education") &&
                <div>
                    <Educationpage />
                </div>
            }

        </>
    )
}

export default Stories