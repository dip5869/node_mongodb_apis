const Items = require('../models/items.model');

const Items_ = {

    getdata: async() => {
        let res = await Items.aggregate([
            { $sort : { "item_addedat" : -1 } }
        ]).exec();
        return res;
    },

    deleteitems: async(data) => {
        let res = Items.findByIdAndRemove(data.item);
        return res;
    },

    updatedata: async (data) => {
        const filter = { _id:data.item };
        const update = {
            ...data.data,
            item_updatedat: new Date()
        };
        let doc = await Items.findOneAndUpdate(filter, update, {
            new: true,
            upsert: true
          });
        return doc;
    },

}
module.exports = Items_;