import { createMachine } from "xstate";



export const testMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXbcgNzACdIBiAWQHkBVAZQFF2AarwBKAbQAMAXUSgADuVi5KucvhkgAHogCMAdgCcJXdoAcugKwAmAGwmAzJbunrAGhABPHQ5Ljfv0+bWutZ2unYAvuFuaFh4hKQ09EwQbFx8XAAqEtJIIPKKyqrqWgja+tok1pbmvpZm2gAsoQ2uHjriJDV+4voN4nUNZeaRUSAUEHDqMTgExOr5SipquSUAtK2eCKvBJPp7++Lm+sbmJpHRGDPxZFSJjJDzCotFK4gNlm6bZp32dnYN7xC1kGlnOIGmcWIJDuyUeBSWxUQf0sJBaZnM5l0lneugsuk+iH0HXEv3+gLswO0ERGQA */
    initial:"nothovered",
    states: {
        nothovered: {
            on: {
                MOUSEOVER:{
                    target: "hovered"
                }
            }
        },
        hovered: {
            on: {
                MOUSEOUT:{
                    target: "nothovered"
                }
            }
        }
    }
}) 
