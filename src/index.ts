import { bootstrap } from "./app.bootstrap.js";

bootstrap().catch((error: unknown) => {
  console.error("Failed to start the application:", error);
  process.exit(1);
});