import { Status } from "../status/status";
import { User } from "../user/user";

export class Processus {
    id_processus!:number;
    name_processus!:String;
    initialFile!:File;
    finalFile!:File;
    signataire!:User;
    emission_date!:Date;
    status!:Status;
}
