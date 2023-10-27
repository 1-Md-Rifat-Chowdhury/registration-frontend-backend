const e = require('express');
const express = require('express')
const cors = require('cors')
const ap = express()
const port = process.env.PORT || 5000;

ap.get('/', (req, res) => {
    res.send('Hello World!')
})

ap.use(cors())
ap.use(express.json())
// ap.use(express.urlencoded())



const mongoose = require('mongoose');


async function main() {
    try {
        await mongoose.connect(`mongodb+srv://rifat:g92lYOtb3F5JVcKN@bengal.jfb9kcz.mongodb.net`);
        console.log("Database is connected");
    }
    catch (error) {
        console.log(error.message)
    }
}
main()


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String, 
        required: true
    },
})

const User = mongoose.model('user', userSchema);

ap.post('/user', async (req, res) => {
    try {
        const addUser = new User({
            ...req.body
        })
        
        const usersData = await addUser.save();
        console.log(usersData)

        if (usersData) {
            res.status(201).send({
                success: true,
                data: usersData

            })

        }
        else {
            res.status(404).send({
                message: " user created failed. "
            });
        }


    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })

    }
})

ap.listen(port, () => {
    console.log(`server id running port ${port}`);
})





