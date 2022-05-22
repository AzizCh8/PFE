import { Departement } from "../departement/departement";
import { Role } from "../Role/role";

export class User {

    public id!:number;
    public first_name!:String;
    public last_name!:String;
    public name!:String;
    public username!:String;
    public password!:String;
    public role_id!:Role;
    public id_dep!:Departement;
}
