import { createMachine } from "xstate";

export const repairTaskMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcCGsDWsB0BjATmKspAMSoAOF+A9gG6QDaADALqKgU2wCWyPNAHYcQAD0QBaAGzNszAKwAWKQA4A7PIA0IAJ6IVARgC+R7Wkw4CREhFKEAVmFw2W7JCC69+QkeIQAmeQBObABmRVCNbT0ECQiTM3QsbEpqejIAMwBXQQgmNhFPPgFhdz8DWTVmUINA6MQDKXlseQSQc2Ts3LIAW1R8DEgAfR5BIbSoQlhYV0LuYp8yxH9mf2wVCKjdZalFNo6cUfHaSbhYUj6B4dwaHooAGzAXAvci71LQPwkgoPqEUPkoRaJlMIEENDy8HcBzmXhKvkk-iCsgM8ikdW2sQMoVkrVBBzwhGIkFhCw+YkRijWqPRWkxEiBeMSFhSVFoDAgpPeCNiu2wigMimYtL+-lR+ySOAcThsXPhSwQGmwFSCkTpMRWwPxkuwXTynNe825CoMKiB4TVfwMgq1zOSRwmUyhnCN8s+DRqf1CKmYEpZNzuj1lhrhi3dsX8oSk-MtmKFKi1JiAA */
    id: "tasks",
    tsTypes:{} as import("./repairTaskMachine.typegen").Typegen0,
    predictableActionArguments:true,
    initial: "created",

    states: {
        created:{
            on: {
                approve: "approved",
                reject: "rejected"
            }
        },

        approved:{
            on: {
                fund: "funded"
            },
        
        },

        rejected:{
            type: "final"
        },

        funded:{
            on: {
                mark_in_progress: "in_progress"
            }
        },

        in_progress:{
            on: {
                mark_complete: {
                    target: "completed",
                 
                }
            }
        },

        completed:{
            type: "final"
        }
    },

})
