import { Login, PlacePagination, LockPagination } from "./Types";

const KisiClient:any = require("kisi-client").default;

class Kisi {

    private client: any;
    private loginCallbacks: Function[] = [];
    private logoutCallbacks: Function[] = [];

    constructor() {
        this.client = new KisiClient();
    }

    async login(email: string, password: string): Promise<Login> {
        const login = await this.client.signIn(email, password);
        window.localStorage.setItem("token", login.secret);
        this.loginCallbacks.forEach(c => c.call(this));
        return login;
    }

    async getPlaces(): Promise<PlacePagination> {
        return this.client.get("places");
    }

    async getLocks(placeId: string): Promise<LockPagination> {
        return this.client.get("locks", { placeId })
    }

    async unlock(lockId: string): Promise<any> {
        return this.client.post(`locks/${lockId}/unlock`);
    }

    async getUnlockEvents(placeId: string, actorId: string, actorType: string = "user"): Promise<any> {
        return this.client.get("events", { placeId, actorId, actorType, action: 'unlock'});
    }

    async verifyAuthentication(): Promise<boolean> {
        if(!this.client.client.defaults.headers.common['X-Login-Secret']) {
            const token = window.localStorage.getItem("token");
            if (token != null) {
                this.client.setLoginSecret(token);
            } else {
                return false;
            }
        }
        try {
            await this.client.get("user");
            return true;
        } catch(e) {
            return false;
        }
    }

    onLogin(callback: Function): void {
        this.loginCallbacks.push(callback);
    }

    offLogin(callback: Function): void {
        const index = this.loginCallbacks.indexOf(callback);
        this.loginCallbacks.splice(index, 1);
    }

    onLogout(callback: EventListener): void {
        this.logoutCallbacks.push(callback);
    }

    offLogout(callback: EventListener): void {
        const index = this.logoutCallbacks.indexOf(callback);
        this.logoutCallbacks.splice(index, 1);
    }
}

export default new Kisi();