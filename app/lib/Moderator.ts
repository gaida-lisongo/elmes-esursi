import { authenticateModerator, updateEtab } from "@/app/actions/auth";

class Moderator {
    private static instance: Moderator;
    private token: string = "";
    private etabId: string = "";
    private role: string = "";
    private agentId: string = "";

    private constructor() {
        if (typeof window !== "undefined") {
            this.token = localStorage.getItem("token") || "";
            this.etabId = localStorage.getItem("etabId") || "";
            this.role = localStorage.getItem("role") || "";
            this.agentId = localStorage.getItem("agentId") || "";
        }
    }

    public static getInstance(): Moderator {
        if (!Moderator.instance) {
            Moderator.instance = new Moderator();
        }
        return Moderator.instance;
    }

    public isLoggedIn(): boolean {
        return !!this.token && !!this.etabId;
    }

    public getEtabId(): string {
        return this.etabId;
    }

    async login({ agentId, secureKey, role, etabId }: { agentId: string, secureKey: string, role: string, etabId: string }) {
        try {
            const result = await authenticateModerator({
                agentId,
                secureKey,
                role,
                etabId
            });

            if (result.success && result.data) {
                const data = result.data;

                this.token = data.token;
                this.etabId = data.etabId;
                this.role = data.role;
                this.agentId = data.agentId;

                localStorage.setItem("token", this.token);
                localStorage.setItem("etabId", this.etabId);
                localStorage.setItem("role", this.role);
                localStorage.setItem("agentId", this.agentId);

                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to login:", error);
            return false;
        }
    }

    async logout() {
        this.token = "";
        this.etabId = "";
        this.role = "";
        this.agentId = "";

        localStorage.removeItem("token");
        localStorage.removeItem("etabId");
        localStorage.removeItem("role");
        localStorage.removeItem("agentId");
    }

    async updateEtab(payload: any) {
        if (!this.token || !this.etabId) {
            console.error("Moderator not authenticated");
            return false;
        }

        try {
            const result = await updateEtab({
                url: `https://esursi-app.vercel.app/api/etablissements/${this.etabId}`,
                token: this.token,
                payload
            });

            if (result.success && result.data) {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to update:", error);
            return false;
        }
    }
}

export default Moderator;
