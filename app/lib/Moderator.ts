import { authenticateModerator } from "@/app/actions/auth";

class Moderator {
    agentId: string;
    secureKey: string;
    role: string;
    etabId: string;
    constructor({ agentId, secureKey, role, etabId }: { agentId: string, secureKey: string, role: string, etabId: string }) {
        this.agentId = agentId;
        this.secureKey = secureKey;
        this.role = role;
        this.etabId = etabId;
    }

    async login() {
        try {
            const result = await authenticateModerator({
                agentId: this.agentId,
                secureKey: this.secureKey,
                role: this.role,
                etabId: this.etabId
            });

            if (result.success && result.data) {
                const { token, etabId, role, agentId } = result.data;

                //save token in local storage
                localStorage.setItem("token", token);
                //save etablissement in local storage
                localStorage.setItem("etabId", etabId);
                //save role in local storage
                localStorage.setItem("role", role);
                //save agentId in local storage
                localStorage.setItem("agentId", agentId);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Failed to login:", error);
            return false;
        }
    }

}

export default Moderator;
