import type { MessageState } from "@/types";
import  { defineStore } from 'pinia'
export const useMessageStore = defineStore('message', {
    state: (): MessageState => ({
        message: ''
    }),
    actions: {
        updateMessage(massage: string): void {
            this.message = massage
        },
        resetMessage(): void {
            this.message = ''
        }
    }
})