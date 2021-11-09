const mongoose = require('mongoose');

const customerschema = mongoose.Schema({
    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    location:{
        nameoflocation:{ 
            type:String,
            require:true},
            details:{
            zipcode:{
                type:String,
                require:true
            },
            cityname:{
                type:String,
                require:true
            },
            statename :{
                type:String,
                require:true
            },
            emailid:{
                type:String,
                require:true
            }
        }
    }});

module.exports = mongoose.model('customers',customerschema);