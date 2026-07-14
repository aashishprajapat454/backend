import mongoose, { Types } from "mongoose";

const eventsSchema = new mongoose.Schema({
    animalid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal'
    },
    eventType: {
        type: String,
        enum: [
            "Heat",
            "AI",
            "Pregnancy Check",
            "Calving",
            "Dry Off",
            "Vaccination",
            "Medicine",
            "Deworming",
            "Weight",
            "Milk",
            "Sale",
            "Purchase",
            "Death",
            "Custom"
        ],
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    RecordedByUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    note: String,
    data: string // pending for now
}, { timestamps: true })

export const Event = mongoose.model('Event', eventsSchema)