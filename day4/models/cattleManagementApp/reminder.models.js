import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
    animalid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animal'
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    },
    dueDate: Date,
    title: {
        type: String,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending','Completed','Cancelled']
    },
    notificationSent: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export const Reminder = mongoose.model('Reminder', reminderSchema)