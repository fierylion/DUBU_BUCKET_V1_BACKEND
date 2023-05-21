const {StatusCodes:Status} = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
 //Database errors
 
 let defaultError = {
  success:false,
  status: Status.INTERNAL_SERVER_ERROR,
  msg: 'Something went wrong'
 }
 if(err.name && err.name==='ValidationError'){
  defaultError.msg = Object.values(err.errors).map((item)=>item.message).join(' , ');
  defaultError.status = Status.BAD_REQUEST
 }
 if (err.name && err.name === 'CastError') {
   defaultError.msg = `No item with the id ${err.value}`
   defaultError.status = Status.BAD_REQUEST
 }
 if (err.code && err.code === 11000) {
   defaultError.msg = `Duplicate values entered for ${Object.keys(
     err.keyValue
   )} please choose another value/ Already exists`
   defaultError.status= Status.BAD_REQUEST
 }
 return res.status(defaultError.status).json({err: defaultError.msg})
}
module.exports = errorHandlerMiddleware