import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";

@Resolver()
export class TaskResolver {
    @Query(() => [Task])
    tasks() {
        return Task.find({});
    }

    @Query(() => Task, { nullable: true })
    task(
        @Arg("id", () => Int)
        id: number
    ): Promise<Task | null> {
        return Task.findOneBy({ id });
    }

    @Mutation(() => Task)
    createTask(
        @Arg("title", () => String)
        title: string
    ): Promise<Task> {
        return Task.create({
            title,
            completed: false,
        }).save();
    }

    @Mutation(() => Boolean, { nullable: true })
    updateTask(
        @Arg("id", () => Int)
        id: number,
        @Arg("completed", () => Boolean)
        completed: boolean
    ): boolean | null {
        const task = Task.findOneBy({ id });
        if (!task) {
            return null;
        }
        try {
            Task.update({ id }, { completed })
            return true;
        } catch {
            return false;
        }
    }


    @Mutation(() => Boolean)
    deleteTask(
        @Arg("id", () => Int)
        id: number
    ): boolean {
        try {
            Task.delete({ id });
            return true;
        } catch (error) {
            return false;
        }
    }
}
