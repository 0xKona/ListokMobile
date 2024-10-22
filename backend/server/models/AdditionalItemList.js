import mongoose from "mongoose";

const additionalItemsListSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
    },
    items: {
        type: String,
    }
})

const AdditionalItems = mongoose.model('AdditionalItems', additionalItemsListSchema);
export default AdditionalItems;