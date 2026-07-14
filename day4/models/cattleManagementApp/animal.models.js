import mongoose from "mongoose";

const animalSchema = new mongoose.Schema({
    owneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tagNum: {
        type: String,
        unique: true,
        maxlength: 15,
        required: [true, 'tag number is requierd'],
    },
    name: String,
    breed: {
        type: String,
        enum: ['HF', 'Jurrsy', 'Cross-Breed', 'Sahival', 'Gir', 'desi'],
        default: 'HF'
    },
    Sex: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Female',
        required: true
    },
    DOB: {
        type: Date
    },
    purchaserDate: Date,
    image: {
        type: String,
        default: 'image url'
    },
    lifeStatus: {
        type: String,
        enum: [
            'Active',
            'Sold',
            'Dead',
            'Missing'
        ],
        default: 'Active'
    },
    note: String

}, { timestamps: true });

export const Animal = mongoose.model("Animal", animalSchema);