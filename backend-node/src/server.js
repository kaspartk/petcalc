const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
require("dotenv").config()

const petRoutes = require('./routes/pet');
const petTypeRoutes = require('./routes/petType');

const app = express()
app.use(express.json());

app.use('/api/pet', petRoutes);
app.use('/api/pettype', petTypeRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('*', (req, res) => {
  res.send('This route does not exist')
})

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
  })
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })