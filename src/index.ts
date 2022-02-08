import mongoose, { Document } from 'mongoose';
import moment from 'moment';
import dotenv from 'dotenv';

dotenv.config();

const [_,__, dbName] = process.argv;

const REQUIRED_VARS = [
    'APPLE_DB_URI',
    'GPLAY_DB_URI'
];

REQUIRED_VARS.forEach(envVar => {
    const val = process.env[envVar];
    if (val === '' || val === null || val === undefined) {
      throw new Error(`Required ENV VAR not set: ${envVar}`);
    }
});

const dbConnection = {
    google: String(process.env.GPLAY_DB_URI),
    apple: String(process.env.APPLE_DB_URI),
}

import Review,{ Review as ReviewInterface } from './schemas/review';

async function init() {
    const conn = await mongoose.createConnection(dbName === 'google' ? dbConnection.google : dbConnection.apple )
        .asPromise();
    try {
        const findReview = await conn.model<ReviewInterface>('Review',Review)
            .find({
                date: { 
                    $gt: moment('2022-01-24').startOf('day').toDate(), 
                    $lt: moment('2022-02-04').endOf('day').toDate()
                },
                history: { 
                    $exists: true,
                },
                $nor: [{ history: { $size: 0 } },{ history: { $size: 1 } },{ history: { $size: 1 } }],
            })
            .exec();

        const reducedReviws = findReview.reduce((prev: Document<unknown, any, ReviewInterface>[],curr) => {
            let hasDuplicated = false;

            const modifiedHistory = curr?.history.map((hist,indx,histArr) => {
                if( histArr[indx + 1] 
                    && hist.text === histArr[indx + 1]?.text 
                    && hist.score === histArr[indx + 1]?.score 
                    && hist.version === histArr[indx + 1]?.version 
                ) {
                    delete histArr[indx + 1];
                    hasDuplicated = true;
                }
                return hist;
            });
            
            if(hasDuplicated) {
                curr.history = modifiedHistory;
                prev.push(curr);
            }

            return prev;
        },[]);

        for (const rev of reducedReviws) {
            const response = await rev.update(rev);
            console.log('updated',response); 
        }
        
        await conn.close();
        
    } catch (error) {
        console.log('error',error);
        await conn.close(); 
    }
}

init();