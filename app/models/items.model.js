const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    item_name: String,
    item_price: Number,
    item_status: Number,
    item_addedat: Date,
    item_updatedat: Date
});
module.exports = mongoose.model('items',dataSchema);