import 'dotenv/config'
import { error } from "node:console";
import sequelize from "./config/database.ts";

async function main() {
    try {
        await sequelize.authenticate()
        console.log("DB Connection successfull")
    } catch (e) {
        console.error("Failed to connect: ", error)
    } finally {
        await sequelize.close()
    }
}

main()