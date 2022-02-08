import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface History {
    type: String,
    title: String,
    score: Number,
    text: String,
    sentiment: String,
    category: String,
    version: String,
    date: Date,
    replyText: String,
    replyDate: Date,
    replyTime: Number,
    replyTimeText: String,
    replyTimeBusinessMinutes: Number,
}

const historySchema = new Schema({
    type: String,
    title: String,
    score: Number,
    text: String,
    sentiment: String,
    category: String,
    version: String,
    date: Date,
    replyText: String,
    replyDate: Date,
    replyTime: Number,
    replyTimeText: String,
    replyTimeBusinessMinutes: Number,
});

export default historySchema;