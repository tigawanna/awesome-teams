import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AlertState {
    alerts: number
    increase: (by: number) => void
    clearNotification: () => void
}

export const useAlertStore = create<AlertState>()(
    devtools(
        persist(
            (set) => ({
                alerts: 0,
                increase: (by) => set((state) => ({ alerts: state.alerts + by })),
                clearNotification: () =>{set((state) => ({ alerts: 0 }))}
            }),
            {
                name: 'alert-storage',
            }
        )
    )
)
