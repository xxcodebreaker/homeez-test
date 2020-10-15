const express = require("express");
const router = express.Router();
const QuotationPost = require('../model/QuotationPost');

router.get("/", function (req, res, next) {
    QuotationPost.find({})
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((err) => {
            console.log('Data: ', err);
        })
});

router.post("/submit-quotation", function (req, res) {
    const newQuotationPost = new QuotationPost(req.body);
    newQuotationPost.save((error)=>{
        if(error){
            console.log('Something is wrong!');
        } else {
            console.log('Data has been saved!');
        }
    })
    console.log(req.body);
    res.send(req.body);
});

module.exports = router;