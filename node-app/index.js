const express = require('express')
const http = require('http');           //
const socketIo = require('socket.io');  //
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require('path');
var jwt = require('jsonwebtoken');
const multer = require('multer')
const productController = require('./controllers/productControllers');
const userController = require('./controllers/userControllers');

const exchangeRequestRoutes = require('./routes/exchangeRequests');
const ExchangeRequest = require('./models/ExchangeRequests');

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
const bodyParser = require('body-parser')
const app = express()


const server = http.createServer(app);   //
const io = socketIo(server);             //


app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from the client
    socket.on('send-message', (message) => {
        console.log('Message received:', message);

        // Emit the message to all connected clients (you can change this to specific users if needed)
        io.emit('receive-message', message);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = 4000
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { dbName: "Swapifydb"})
.then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});



app.use('/api/exchange-request', exchangeRequestRoutes);
app.get('/', (req, res) => {
    res.send('hello...')
})
app.get('/search', productController.search)
app.post('/like-product', userController.likeProducts)
app.post('/add-product', upload.fields([{ name: 'pimage' }, {name : 'pimage2'}]), productController.addProduct)
app.get('/get-products', productController.getProducts)
app.get('/get-product/:pId', productController.getProductsById)
app.post('/liked-products', userController.likedProducts)
app.post('/my-products', productController.myProducts)
app.post('/signup', userController.signup)
app.get('/my-profile/:userId', userController.myProfileById)
app.get('/get-user/:uId', userController.getUserById)
app.post('/login', userController.login)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})