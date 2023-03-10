import { createMachine } from "xstate";


export const todosMachine = createMachine({
    id: "todos",
    initial: "idle",
    states: {
        idle: {
            on: {
                ACTIVATED: "active",
            },
        },
        active: {
            on: {
                DONE: "completed",
            },
        },
        completed: {
            on: {
                TOGGLE: "active",
            },
        },
    },
})
