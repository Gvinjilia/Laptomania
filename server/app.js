const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const globalErrorHandler = require('./controllers/error.controller');
const laptopRouter = require('./routers/laptop.router');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const userRouter = require('./routers/user.router');
const authRouter = require('./routers/auth.router');
const rateLimiter = require('express-rate-limit');
const oauthRouter = require('./routers/oauth.router');
const mongoSanitize =  require('express-mongo-sanitize');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(helmet()); /* helmet - არის module - რომელსაც ჩვენ გამოვიყენებთ მაშინ როდესაც გვინდა ჩვენი website - ის დაცვა, helmet module - ის დახმარებით headers - ში
უსაფრთოხოების შესახებ იწერება დამატებითი ინფორმაცია, რაც ჩვენს website - ს უფრო დაცულს გახდის */
app.use(rateLimiter({ /* rateLimiter - არის module - რომელიც გამოიყენება მაშინ, როდესაც მომხმარებელი გზავნის ბევრ მოთხოვნას server - ზე, rateLimiter - გადაეცემა
    რამოდენიმე კუთვნილება, windowMs - ის დახმარებით ვაკონტროლბთ დროს, თუ როდის შეძლებს მომხმარებელი ხელახლა მოთხოვნის გაგზავნას server - ზე */
    windowMs: 15 * 60 * 1000, // თუ მომხმარებელმა server - ზე გააგზავნა 101 მოთხოვნა მაშინ ჩვენ აღარ მივცემთ მას უფლებას, რომ გამოაგზავნოს მოთხოვნები
    limit: 100, /* limit - კუთვნილება აკონტროლებს მოთხოვნების რაოდენობას, თუ მოცემული 100 მოთხოვნა მომხმარებელმა გამოიყენა ის 15 წუთის შემდეგ და - reset - დება */
    message: 'Too many requests' // message კუთვნილების გამოყენებით მომხმარებელს ვაცნობებთ, რომ მან გააგზავნა ზედმეტად ბევრი მოთხვნა server - ზე
}));
// app.use(mongoSanitize()); /* mongoSanitize - გვეხმარება NoSQL injection - ისგან თავის არიდებაში, თუ მომხმარებელმა input - ში შემოიტანა ისეთი სიმბოლო რომელიც
// NoSQL ტიპის მონაცემთა ბაზაში command - აღნიშნავს მაშინ mongoSanitize module - ის გამოყენებით, მსგავსი სიმბოლოები input - ებიდან წაიშლება */

/* stripe - არის გადახდის პლატფორმა, stripe - ის გამოყენებით შესაძლებელია გადახდა ონლაინ Google pay, paypal, mastercard, visa და ბევრი სხვადასხვა მეთოდით, 
stripe - ით ჩვენ არ გვიწევს ჩვენივე გადახდის სისტემის შექმნა და ჩაშენება ჩვენს ვებ-გვერდზე რადგან მას ეს თვისება უკვე აქვს

OAUTH - open authorzation, OAUTH - ის დახმარებით ჩვენ მომხმარებელს არ ვთხოვთ რომ შემოიტანოს თავისი მონაცემები, მაგალითად ჩვენ შეგვიძლია გამოვიყენოთ Google - ის 
OAUTH - ი, როდესაც მომხმარებელი აირჩევს სასურველ account - ს, GOOGLE - ი ვებ-გვერდს მისცემს token - ს რომელიც ადასურებს მომხმარებლის იდენტობას, GOOGLE - ან სხვა
პლატფორმების OAUTH - ით მომხმარებელს აღარ უწევს თავისი ინფორმაციის შეტანა */

app.use(cookieParser());
app.use(express.json());

app.use('/api/laptops', laptopRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/oauth', oauthRouter);
// app.use('/laptops/images', express.static(path.join(__dirname, '/uploads/laptops')));

app.use(globalErrorHandler);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('connected to mongoDB');

        app.listen(process.env.PORT, () => {
            console.log('The server is running or port', process.env.PORT)
        });
    })
    .catch(err => {
        console.log(err);
        process.exit(1);
    });