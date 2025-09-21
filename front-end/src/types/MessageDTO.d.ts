import type { MessageType } from "@/enums/MessageType"

export interface MessageDTO {
    type: MessageType
    message: string
}