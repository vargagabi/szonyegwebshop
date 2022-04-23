import {Carpet} from "./carpet";

export interface Cart{
    id: string,
    userID: string,
    items: Array<Carpet>,
}
