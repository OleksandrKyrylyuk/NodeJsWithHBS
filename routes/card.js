const { Router, json } = require('express');
const course = require('../models/course');
const Course = require('../models/course');

const router = Router();

function mapCartItems(cart) {
    return cart.items.map(el => ({
        ...el.courseId._doc,
        count: el.count,
        id: el.courseId.id
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.post('/add', async(req, res) => {
    const course = await Course.findById(req.body.id);
    await req.user.addToCart(course)
    res.redirect('/')
})

router.get('/', async(req, res) => {
    const user = await req.user.populate('cart.items.courseId');

    const courses = mapCartItems(user.cart);

    res.render('card', {
        title: 'Shopping cart',
        isCard: true,
        courses: courses,
        price: computePrice(courses)
    })
})

router.delete('/remove/:id', async(req, res) => {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user.populate('cart.items.courseId');
    const courses = mapCartItems(user.cart)
    res.status(200).json({ courses, price: computePrice(courses) });
})

module.exports = router