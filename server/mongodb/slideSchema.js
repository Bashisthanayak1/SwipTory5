
const mongoose = require('mongoose');
const slideSchema = new mongoose.Schema({
    aslide: [
        {
            Your_heading: { type: String, required: true },
            Story_Description: { type: String, required: true },
            Add_Image_URL: { type: String, required: true },
            Select_category: { type: String, required: true },
        }
    ],
    aslidelikearry:[]
   
});

const SlideModel = mongoose.model('slidedetails', slideSchema);

module.exports = SlideModel;
