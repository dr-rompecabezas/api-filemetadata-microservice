var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer  = require('multer')

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({extended:false})) 
app.use(express.json())

// SET STORAGE
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })
 


app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    let response = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  }
    res.send(response)
  
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
