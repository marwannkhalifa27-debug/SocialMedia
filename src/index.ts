import { bootstrap } from "./app.bootstrap.js";


bootstrap().catch((error) => {
    console.log("Failed to start the app:", error)
    process.exit(1)
})