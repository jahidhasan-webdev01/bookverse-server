import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";


const PORT = process.env.PORT || 5000;


async function main() {

    try {

        await mongoose.connect(
            process.env.DATABASE_URL!
        );


        console.log("MongoDB Connected");


        app.listen(
            PORT,
            () => {
                console.log(
                    `Server running on ${PORT}`
                );
            }
        );


    } catch (error) {

        console.log(
            "Failed to connect with database"
        );

    }

}


main();