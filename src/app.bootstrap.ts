import express, { type Request, type Response, type Express } from "express";
import { port } from "./config/env.config.js";
import { Database } from "./DB/connectionDB.js";
import { logger } from "./common/middleware/logger.middleware.js";
import { globalErrorHandler } from "./common/middleware/error.middleware.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { createHandler } from 'graphql-http/lib/use/express';

const userType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLString },
  },
});

const users = [
  { id: 1, name: "Ahmed" },
  { id: 2, name: "Yousef" },
];

export class Application {
  private app: Express;

  constructor() {
    this.app = express();
  }

  private async setupDatabase(): Promise<void> {
    const db = Database.getInstance();
    await db.connect();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(logger);
  }

  private setupRoutes(): void {


    const schema = new GraphQLSchema({
        query: new GraphQLObjectType({
          name: "Query",
          description: "Hi there",
          fields: {
            hello: {
              type: new GraphQLNonNull(GraphQLString),
              description: "return hello",
              resolve: () => "Marwan",
            },
            getUser:{
              type: userType,
              args: {
                id: { type: new GraphQLNonNull(GraphQLInt)}
              },
              resolve:(parent: any, args: any) => {
                const { id } = args
                return users.find(user => user.id === id)
              }
            },
            getUsers:{
              type: new GraphQLList(userType),
              resolve:() => {
               return users
              }
            }
          },
        }),
      });

      this.app.use("/graphql", createHandler({ schema }))


    this.app.use("/auth", authRouter);
    this.app.use("/user", userRouter);

    this.app.get("/", (_req: Request, res: Response) => {
      res.status(200).json({ success: true, message: "Hello there" });
    });

    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ success: false, message: "Route not found" });
    });

    this.app.use(globalErrorHandler);
  }

  public async start(): Promise<void> {
    await this.setupDatabase();
    this.setupMiddlewares();
    this.setupRoutes();

    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export const bootstrap = async (): Promise<void> => {
  const application = new Application();
  await application.start();
};