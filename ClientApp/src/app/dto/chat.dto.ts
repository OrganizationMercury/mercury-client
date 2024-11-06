import { FileDto } from "./file.dto";

export enum ChatType {
    Private,
    Group
}

export interface ChatDto {
    id : string,
    type : ChatType,
    name : string | null,
    avatar : string | null
}

export interface ChatWithAvatarDto {
    id : string,
    type : ChatType,
    name : string | null,
    avatar : string | null
}


