import { Login, PlacePagination, LockPagination } from "./Types";

const KisiClient:any = require("kisi-client").default;

class Kisi {

    private client: any;

    constructor() {
        this.client = new KisiClient();
    }

    async login(email: string, password: string): Promise<Login> {
        return this.client.signIn(email, password);
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
}

export default new Kisi();