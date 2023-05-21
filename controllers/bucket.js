const Bucket = require('../models/Bucket')
const vCard =require('vcards-js')
const fs = require('fs')
const path = require('path')
const {StatusCodes:Status} = require('http-status-codes')
//post user to bucket
const postUserToBucket = async (req,res)=>{
 const user = await Bucket.create({...req.body})
 res.status(Status.CREATED).json({success:true, name:user.name})
}
//retrieve all users and create vcards
const getAllUsersVcard = async (req,res)=>{
 let users = await Bucket.find({});
 //This implementation only for single file having all vcards

try{
users = users.map((user)=>{
  const card = vCard()
  card.firstName = user.name
  card.workPhone = user.phone
  return card.getFormattedString();
})

res.set('Content-Type', 'text/vcard');
res.set('Content-Disposition', 'attachment; filename="contacts.vcf"');
res.send(users.join('\n'));
}
catch(err){
 console.log(err)
}
 // This implementation download a zip folder of vcards

//  //convert each user to vcard object
// const  vCards = users.map((user)=>{
//    const singleUserObject = vCard()
//    singleUserObject.firstName = user.name
//    singleUserObject.workPhone = user.phone
//    singleUserObject.organization = 'Bucket Cops'
//    const contactDetails = {filename:`contact-${user.name}.vcf`,
//   data:singleUserObject.getFormattedString()
//   }
//    return contactDetails;
//  })
 
//  // response headers
//  res.set('Content-Type', 'application/zip');
//  res.set('Content-Disposition', 'attachment; filename="contacts.zip"');
//  console.log('set headers')
// //send vcard as a zip file 
// const archiver = require('archiver');
// const archive= archiver('zip');
// vCards.forEach((vcard)=>{
//  archive.append(vcard.data, {name:vcard.filename})
// });
// //send the zip file
// archive.pipe(res);
// archive.finalize();

}


module.exports = {postUserToBucket, getAllUsersVcard}