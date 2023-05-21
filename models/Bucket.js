const mongoose = require('mongoose')
const BucketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [40, 'Must be less than 40 characters'],
    minlength: [3, 'Must be more than 3 characters'],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique:true,
    validate: {
      validator: function (v) {
        return /^(\+?\d{3}|0)\d{9}$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
})
module.exports = mongoose.model('Bucket', BucketSchema)