const express = require('express');
const customer = require('../models/customer');
const router= express.Router()
const Customer = require('../models/customer');

 // getting all customers
 
 router.get('/', async(req,res) =>{
      try{ const customers = await Customer.find();
         res.json(customers);
        }
        catch (err){ res.json({message:err}); 
    }
});

// getting a customer by id

router.get('/:customerid', async(req,res) =>{
     try{ const customer = await Customer.findById(req.params.customerid); res.json(customer); 
    }
    catch(err){ res.json({message:err}); 
} 
});

//http route methods

//create a customer
router.post('/',(req,res)=>{
    const customer=new Customer({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        location:{nameoflocation:req.body.location.nameoflocation,
            details:{zipcode:req.body.location.details.zipcode,
                cityname:req.body.location.details.cityname,
                statename:req.body.location.details.statename,
                emailid:req.body.location.details.emailid
            }
          }
    });
    customer.save().
    then(data=>{
        res.json(data);
    }).catch(err=>{
        res.json({message:err});
    })
});

// deleting a customer

router.delete('/:customerid', async(req,res) =>{
     try{
          const removecustomer = await Customer.deleteOne({_id: req.params.customerid});
      res.json(removecustomer); 
    }
    catch(err){
         res.json({message:err}); 
        } 
    }); 

// updating a customer by id

router.patch('/:customerid', async(req,res) =>{
     try{ 
         const customer = await Customer.findOne({_id: req.params.customerid});
         if(req.body.firstname){
             customer.firstname=req.body.firstname;
         }
         if(req.body.lastname){
            customer.lastname=req.body.lastname;
        }
        if(req.body.location){
        if(req.body.location.nameoflocation){
            customer.location.nameoflocation=req.body.location.nameoflocation;
        }}
        if(req.body.location.details){
            if(req.body.location.details.zipcode){
            customer.location.details.zipcode=req.body.location.details.zipcode;
        }
        if(req.body.location.details.cityname){
            customer.location.details.cityname=req.body.location.details.cityname;
        }
        if(req.body.location.details.statename){
            customer.location.details.statename=req.body.location.details.statename;
        }
        if(req.body.location.details.emailid){
            customer.location.details.emailid=req.body.location.details.emailid;
        }
        await customer.save();
        res.json(customer);
    }} catch(err){ 
        res.json({message:err});
    }
});


module.exports=router;