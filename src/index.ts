import "reflect-metadata"
import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { DataSource } from "typeorm";
import { Task } from "./entities/Task";


const main = async () => {
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

    await dataSource.initialize();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [TaskResolver],
            validate: false,
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await apolloServer.start()
    const app: Express = express();

    apolloServer.applyMiddleware({ app })
    app.get("/", (_req, res) => res.send("hello world!"));

    const PORT = process.env.PORT || 9000;
    app.listen(PORT, () =>
        console.log(`Start Server at: http://localhost:${PORT}`)
    );
};

main().catch((err) => console.error(err));
