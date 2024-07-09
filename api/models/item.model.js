import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    petId: {
        type: String,
        required: true,
        unique: true
    },
    userId:{
        type:String,
        required:true,
       
        
    },
    petname: {
        type: String,
        required: true,
       
    },
    species: {
        type: String,
        required: true,
        
    },
    breed: {
        type: String,
        required: true,
      
    },
    age: {
        type: String,
        required: true,
      
    }, 
    gender: {
        type: String,
        required: true,
      
    },
    color: {
        type: String,
        required: true,
      
    },
    weight: {
        type: String,
        required: true,
      
    },
    profilePicture:{
        type:String,
        default:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    }
    
}, { timestamps: true });

const Item = mongoose.model("Pets", itemSchema);

export default Item;
