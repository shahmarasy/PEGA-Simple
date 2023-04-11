import "reflect-metadata"
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";


const main = async () => {
    // Create a new data source with the given parameters
    const dataSource = new DataSource({
        type: "postgres",
        host: "localhost",
        port: 2022,
        username: "postgres",
        password: "1968",
        database: "todolist",
        logging: true,
        synchronize: true,
        entities: [Task],
    })

    // Initialize the data source
    await dataSource.initialize();

    // Create a new ApolloServer with the given schema and plugins
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    // Start the ApolloServer
    await apolloServer.start()
    const app: Express = express();

    // Apply the middleware to the express app
    apolloServer.applyMiddleware({ app })
    app.get("/", (_req, res) => res.send("hello world!"));

    // Set the port to the environment variable PORT or 9000 if it's not set
    const PORT = process.env.PORT || 9000;
    // Start the server
    app.listen(PORT, () =>
        console.log(`Start Server at: http://localhost:${PORT}`)
    );
};

// Start the server
main().catch((err) => console.error(err));