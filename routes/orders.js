const { Router } = require('express');
const Order = require('../models/order')
const router = Router();

router.get('/', async(req, res) => {
    res.render('orders', {
        isOrder: true,
        title: 'orders'
    })
})


router.post('/', async(req, res) => {
    try {
        const user = await req.user.populate('cart.items.courseId');

        const courses = user.cart.items.map(el => ({
            count: el.count,
            course: {...el.courseId }
        }))

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses: courses
        })
        await order.save();
        await req.user.clearCart();

        res.redirect('/orders')

    } catch (e) {
        console.log(e)
    }

})

module.exports = router;