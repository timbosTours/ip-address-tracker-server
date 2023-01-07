const express = require('express')
const axios = require('axios')
require('dotenv').config()


const port = process.env.PORT || 5000
const url = process.env.URL
const apiKey = process.env.API_KEY

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    
  );


  next();
});

app.get('/user', async (req, res) => {
  const fetch_response = await axios.get(`${url}apiKey=${apiKey}`);
  const ipData = await fetch_response.data;
  res.json(ipData)

})

app.post('/search', async (req, res) => {
  const searchIp = await req.body.values.ipAddress

  try {
      const search_fetch_response = await
      axios.get(`${url}apiKey=${apiKey}&domain=${searchIp}`);
      const searchIpData = await search_fetch_response.data;
      res.json(searchIpData)
      console.log(searchIpData)
  } catch (error) {
    console.log(error)
  }
  try {
      const search_fetch_response = await
      axios.get(`${url}apiKey=${apiKey}&ipAddress=${searchIp}`);
      const searchIpData = await search_fetch_response.data;
      res.json(searchIpData)
      console.log(searchIpData)
  } catch (error) {
    console.log(error)
  }

  
  
  
})



app.listen(5000, ()=> {console.log(`Server is running on port ${port}`)})