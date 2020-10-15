const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const quotationPostSchema = ({
    quotation_info: String,
    quotation_valid: {
        type: Boolean,
        default: true
    }
});

const QuotationPost = mongoose.model('Quotation', quotationPostSchema);

module.exports = QuotationPost;