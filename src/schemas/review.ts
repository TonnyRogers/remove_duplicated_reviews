import mongoose from 'mongoose';

import History, { History as HistoryInterface } from './history';

const { Schema } = mongoose;

export interface Criteria {
    criteria: String,
    rating: Number,
}

export interface Review {
    id: String,  
    country: String,  
    lang: String,  
    appId: String,  
    store: String,  
    updated: Date,  
    userName: String,  
    userUrl: String,  
    date: Date,  
    url: String,  
    title: String,  
    text: String,  
    version: String,  
    score: Number,  
    replyDate: Date,  
    replyText: String,  
    replyTime: Number,  
    replyTimeText: String,  
    sentiment: String,  
    sentimentBreakdown: {},    
    category: String,
    categoryBreakdown: {},
    subcategory: String,
    subcategoryBreakdown: {},
    detectedLang: String,
    replyTimeBusinessMinutes: Number,
    thumbsUp: Number,
    criterias: Criteria[],
    history: HistoryInterface[],
    createdAt: Date,
}

const criteriaSchema = new Schema<Criteria>({
    criteria: String,
    rating: Number,
});

const reviewSchema = new Schema<Review>({
    id: String,  
    country: String,  
    lang: String,  
    appId: String,  
    store: String,  
    updated: Date,  
    userName: String,  
    userUrl: String,  
    date: Date,  
    url: String,  
    title: String,  
    text: String,  
    version: String,  
    score: Number,  
    replyDate: Date,  
    replyText: String,  
    replyTime: Number,  
    replyTimeText: String,  
    sentiment: String,  
    sentimentBreakdown: {},    
    category: String,
    categoryBreakdown: {},
    subcategory: String,
    subcategoryBreakdown: {},
    detectedLang: String,
    replyTimeBusinessMinutes: Number,
    thumbsUp: Number,
    criterias: Array(criteriaSchema),
    history: Array(History),
    createdAt: Date,
});

export default reviewSchema;