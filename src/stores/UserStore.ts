import _ from "lodash";
import { action, makeObservable, observable, runInAction } from "mobx";
import React from "react";

class UserStore {
    public name?:string;
    public email?:string;
    public get isRegistered() { return !_.isEmpty(this.name) && !_.isEmpty(this.email);}
    public showAlert: boolean = false;

    constructor() {
        makeObservable(this, {
            name: observable,
            email: observable,
            showAlert: observable
        });
    }

    @action public registerUser(name:string,email:string) {
        runInAction(() => {
            this.name = name;
            this.email = email;
            this.showAlert = true;
        })
    }

    @action public dismissAlert() {
        runInAction(() => this.showAlert = false);
    }

}
export const UserContext = React.createContext<UserStore>(new UserStore());
export default UserStore;