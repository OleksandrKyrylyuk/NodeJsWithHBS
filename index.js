const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders')
const User = require('./models/user');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async(req, res, next) => {
    try {
        const user = await User.findById('6192769862dcc8ab98905df8');
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
    }
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);
app.use('/orders', ordersRoutes);



const PORT = process.env.PORT || 3000;

async function start() {
    const url = `mongodb+srv://warskr:gPQYHCVE1zddccnc@cluster0.ywnqj.mongodb.net/shop`

    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
        });

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'Warskr@gmail.com',
                name: 'Oleksandr',
                cart: {
                    items: []
                }
            })
            await user.save();
        }

        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}

start();