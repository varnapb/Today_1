const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://varnapb04:varna2004@varna.ev3iz.mongodb.net/vimala?retryWrites=true&w=majority&appName=Varna')
  .then(() => console.log('Connected!'))
  .catch((err)=> console.log(err))