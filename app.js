const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subCategoryController = require('./routes/subCategoryRoutes')
const footerCategoryRouter = require('./routes/footerCategoryRoutes')
const brandRouter = require('./routes/brandRouter')
const ProductRouter = require('./routes/productRouter')
const wishlist = require('./routes/wishlistRouter')
const Chat = require('./routes/chatRouter')
const AdminRoute = require('./routes/adminRoute')
const SliderRoute = require('./routes/sliderRoute')
const reactNativeRoute = require('./routes/reactNativeRoute')
const aboutRoute = require('./routes/about&contactRoute')
const CommentRoute = require('./routes/commentRoute')
const Otp = require('./routes/otpRoute')


dotenv.config({ path: "./config.env" });
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET

require("./database/database")
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
// app.use(helmet()); // Set security-related HTTP headers
// app.use(morgan('dev')); // HTTP request logger
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(session({
  secret: GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/users', userRoutes);
app.use('/category', categoryRoutes);
app.use('/subCategory', subCategoryController);
app.use('/footerCategory', footerCategoryRouter);
app.use('/brand', brandRouter);
app.use('/product', ProductRouter)
app.use('/wishlist', wishlist)
app.use("/chat", Chat)
app.use("/admin", AdminRoute)
app.use("/slider", SliderRoute)
app.use("/reactNativeRoute", reactNativeRoute)
app.use("/about", aboutRoute)
app.use("/comment",CommentRoute)
app.use("/otp",Otp)
app.get('/', async (req, res)=> {
res.status(200).json( {status:200,message:"HOME PAGE" , data:null})
})

app.use((req, res, next) => {
  res.status(404).json({status:404, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.stack });
});
const PORT = process.env.PORT || 3010;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});