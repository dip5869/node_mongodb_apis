
const getdataservice = require('../services/items');
const Items = require('../models/items.model');

exports.postdata = async (req, res) => {
    const itemData = new Items({
        ...req.body,
        item_status: 1,
        item_addedat: new Date()
    }); 

    itemData.save(function(err, data){
        if(err){
            res.status(202).send({
                status: "oops"
            });
        }else{
            res.status(202).send({
                status: "success"
            });
        }
        });   
};

exports.getdata = async (req, res) => {
    let data = await getdataservice.getdata();
    res.status(202).send({
        status: "success",
        data: data
    });
};

exports.updatedata = async (req, res) => {
    let data = await getdataservice.updatedata({item:req.body.id,data:req.body});
    res.status(202).send({
        status: "success",
        data: data
    });
};

exports.deleteitems = async (req, res) => {
    let data = await getdataservice.deleteitems({item:req.body.id});
    res.status(202).send({
        status: "success"
    });
};


