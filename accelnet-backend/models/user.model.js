import mysql2 from 'mysql2/promise';

const userSchema = new mysql2.Schema({
    username: {
        type: String,
        required: true,
        unique: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,   
    },
    password: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: ""
    },
})

export const User = mysql2.model("User", userSchema);