import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../entities/Task";

// Resolver for the Task entity
@Resolver()
export class TaskResolver {
    // Query for all tasks
    @Query(() => [Task])
    tasks() {
        // Return all tasks from the database
        return Task.find({});
    }

    // Query for a task by its id
    @Query(() => Task, { nullable: true })
    task(
        @Arg("id", () => Int)
        id: number
    ): Promise<Task | null> {
        // Return the task with the given id from the database
        return Task.findOneBy({ id });
    }

    // Mutation for creating a new task
    @Mutation(() => Task)
    // Create a new task with the given title
    createTask(
        @Arg("title", () => String)
        title: string
    ): Promise<Task> {
        // Create a new task with the given title and set the completed flag to false
        return Task.create({
            title,
            completed: false,
        }).save();
    }

    // Mutation for updating a task
    @Mutation(() => Boolean, { nullable: true })
    updateTask(
        @Arg("id", () => Int)
        id: number,
        @Arg("completed", () => Boolean)
        completed: boolean
    ): boolean | null {
        // Find the task with the given id in the database
        const task = Task.findOneBy({ id });
        // If the task is not found, return null
        if (!task) {
            return null;
        }
        try {
            // Update the task with the given id and completed flag
            Task.update({ id }, { completed })
            return true;
        } catch {
            return false;
        }
    }

    @Mutation(() => Boolean, { nullable: true })
    updateTitle(
        // The id of the task to update
        @Arg("id", () => Int)
        id: number,
        // The title of the task to update
        @Arg("title", () => String)
        title: string
    ): boolean | null {
        // Find the task with the given id in the database
        const task = Task.findOneBy({ id })
        // If the task is not found, return null    
        if (!task) {
            return null;
        }
        try {
            // Update the task with the given id and title
            Task.update({ id }, { title })
            return true;
        } catch {
            return false
        }
    }
    
    // Mutation for deleting a task
    @Mutation(() => Boolean)
    deleteTask(
        @Arg("id", () => Int)
        id: number
    ): boolean {
        try {
            // Delete the task with the given id
            Task.delete({ id });
            return true;
        } catch (error) {
            return false;
        }
    }
}