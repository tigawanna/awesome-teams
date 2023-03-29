import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { NotificationResponse, UnreadAlert } from '../api/notifications'



interface AlertState {

    alert_count: number
    temp_alert_count: number

    last_alert:string|null
    setLastAlert:(last_alert:string) => void
    has_read:boolean
    setHasRead:(has_read:boolean) => void
    increase: (by: number) => void
    setInitialCount: (count: number) => void
    clearNotification: () => void

}

export const useAlertStore = create<AlertState>()(
    devtools(
        persist(
            (set) => ({
                alert_count: 0,
                temp_alert_count:0,
                last_alert:null,
                has_read:false,
                
                setLastAlert: (last_alert:string) => set(() => ({ last_alert })),

                setHasRead: (has_read:boolean) => set(() => ({ has_read })),
                setInitialCount: (count: number) => set(() => ({ alert_count:count, temp_alert_count:count })),
                
                increase: (by) => set((state) => ({
                    alert_count: state.alert_count + by,
                    has_read:false,
                    temp_alert_count:state.temp_alert_count + by
                 })),



                clearNotification: () =>{
                    set(
                    (state) => ({ 
                        alert_count: 0,
                        has_read:true,
                        last_alert: new Date().toISOString()
                    }))

                    setTimeout(() => {
                        set(state => ({
                        temp_alert_count:0
                        }));
                    }, 5000);
                
                },

            }),
            {
                name: 'alert-storage',
            }
        )
    )
)
