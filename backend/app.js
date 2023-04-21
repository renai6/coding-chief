const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors')

const Message = require('./models/Message');

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()


const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:pqSlXVrAzm1DelFLUtkL@containers-us-west-176.railway.app:7608', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
 
app.use(cors())
 

// Body parser middleware
app.use(express.json());

// Routes
app.post('/', async (req, res) => {


  const prompt = req.body.prompt;
  try {

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 64, 
    });

    const message = new Message({ message: prompt, response: response.data.choices[0].text});
    await message.save()

    res.status(200).json({ message: prompt, response: response.data.choices[0].text});
    
  } catch (error) {
    
    res.status(400).json({ message: error});
  }

});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));