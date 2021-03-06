const { Schema, model } = require('mongoose');

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    url: String,
    userId: {
        type: Schema.Types.ObjectId,
        red: 'User'
    }
});

course.method('toClient', function() {
    const course = this.Object();

    course.id = course._id;

    delete course._id
    return course
})

module.exports = model('Course', course)