import { createMachine, assign } from "xstate";

export const repairTaskMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCGsDWsB0BjATmKspAMSoAOF+A9gG5gDaADALqKgU2wCWyPNAHYcQAD0QAWABzNsAZgVyJzAJxSATAFYAbJoA0IAJ6IpK7JuaXLARhXMJcgOxyAvi4NpMOAkRIRShABWYLjILOxIIFy8-EIi4gjSsopKqho6+kaI1hJmWlbMtvZOru4gnljYlNT0ZABmAK6CEOEi0XwCwpEJ2trq2OoSEo4qEtpStupyUgbGCCpmfRY2dg7O6m4e6JWNzWQAtqj4GAD6PIInNVCEsLCtke2xXaA9KtbYKtpymsqaUo6adTWGZZRJqbAFVR2dTOBabcrbHDnS60a5wWCkQ7HE64Gj7CgAGzAJHunG4HTi3UQKgs2DWuUc2lsmgU2lmJjMyysRTWpTKghoEDgIgq8Ae5Ke8UQ6j6H2YfSSNL62hU7IQ7wWmpU+WsLOsqm08NFeEIxEgbQlnSlCDkX3kimUai0ujVC2wS25qxKRsRVSotAYEAtMStVIQP3eSicLIUMsBILmmms2ndvW0jkchSc2nsPq82CCIT8wYpzzEiDk+rlCpkSplqtBqXMBWGOZUcjjeZ2TSFQfFIcpL0QjhkHy+P0BLKmf1di3yK2Kzi7SIuVxuYrJA7LCSkf2wjlyC13jmsjnUasGsjT6fsDnTlc0y7weMJxPN-dL1u1mn3UfG9jsaY5DVQE5AhKQFDvGQJHrNw3CAA */
    id: "tasks",
    tsTypes: {} as import("./otherTaskMachines.typegen").Typegen0,
    predictableActionArguments: true,
    initial: "created",
    context: {
      taskType: ""
    },
    states: {
      created: {
        on: {
          approve: {
            target: "approved"
          },

          reject: "rejected"
        }
      },
      approved: {
        on: {
          fund: "funded"
        }
      },
      rejected: {
        type: "final"
      },
      funded: {
        on: {
          mark_in_progress: "in_progress"
        }
      },
      in_progress: {
        on: {
          mark_complete: {
            target: "completed"
          }
        }
      },
      completed: {
        type: "final"
      }
    },
  },
  {

  }
);

