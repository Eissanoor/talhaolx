const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
require("./database/database")
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/category', categoryRoutes);

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