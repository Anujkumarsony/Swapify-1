const express = require('express')
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer = require('multer')  //used for storing the files and data that are taken from the add-product function (it is used when we have media and images in work)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
var bodyParser = require('body-parser')
const app = express()
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const port = 4000
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch(() => {
    console.log('error');
  })


const Users = mongoose.model('Users', { username: String, password: String });
const Products = mongoose.model('Producs', { pname: String, pdesc: String, price: String, category: String, pimage: String });


app.get('/', (req, res) => {
  res.send('Hello...People!! Welcome to the Exchange Platform')
})

app.post('/add-product', upload.single('pimage'), (req, res) => {
  console.log(req.body);
  console.log(req.file.path);
  const pname = req.body.pname;
  const pdesc = req.body.pdesc;
  const price = req.body.price;
  const category = req.body.category;
  const pimage = req.file.path;
  const product = new Products({ pname, pdesc, price, category, pimage });
  product.save()
    .then(() => {
      res.send({ message: 'saved success.' })
    })
    .catch(() => {
      res.send({ message: 'server err' })
    })
})

app.get('/get-products', (req, res) => {
  Products.find()
  .then((result) => {
    console.log("user data", result)
    res.send({ message: 'success.', products : result })

  })
  .catch((err) => {
    res.send({ message: 'server err' })
  })
})

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new Users({ username: username, password: password });
  user.save()
    .then(() => {
      res.send({ message: 'saved success.' })
    })
    .catch(() => {
      res.send({ message: 'server err' })
    })
})


app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // const user = new Users({ username: username, password: password});
  Users.findOne({ username: username })
    .then((result) => {
      console.log("user data", result)
      if (!result) {
        res.send({ message: 'User not found' })
      } else {
        if (result.password == password) {
          const token = jwt.sign({
            data: result
          }, 'MYKEY', { expiresIn: 60 * 60 });
          res.send({ message: 'find success.', token: token })
        }
        if (result.password != password) {
          res.send({ message: 'wrong password' })

        }
      }
    })
    .catch(() => {
      res.send({ message: 'server err' })
    })

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})