const express = require('express')
const axios = require('axios')
require('dotenv').config()
const tldjs = require('tldjs')
const { check, validationResult } = require('express-validator');


const port = process.env.PORT || 5000
const url = process.env.URL
const apiKey = process.env.API_KEY

const app = express()

app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST"
  )
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",);


  next();
});

app.get('/user', async (req, res) => {
  const fetch_response = await axios.get(`${url}apiKey=${apiKey}`);
  const ipData = await fetch_response.data;
  res.json(ipData)

})



const DOMAIN_REGEX = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;

app.post('/search', async (req, res) => {
  const value = await req.body.values.inputValue

    let search_fetch_response = {}

    
  if (DOMAIN_REGEX) {
    try{  
      search_fetch_response = await
        axios.get(`${url}apiKey=${apiKey}&domain=${value}`);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
//   else {
//     try {
//         search_fetch_response = await
//         axios.get(`${url}apiKey=${apiKey}&ipAddress=${value}`);
//     } catch (error ) {
//       return res.status(500).send({ error: error.message });
//     }
// } 

  let searchIpData = await search_fetch_response.data;
  res.json(searchIpData)
  console.log(searchIpData)
})



app.listen(5000, ()=> {console.log(`Server is running on port ${port}`)})