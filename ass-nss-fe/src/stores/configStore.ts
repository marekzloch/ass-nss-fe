import { apiClient } from "@/api";
import type { Config } from "@/api/types";

export const configStore = {    
    state: reactive({
        configs: null as Config[] | null,
    }), 

    isPopulated: () => {

        return configStore.state.configs !== null;

    },

    fetchConfigById: async (id: number) => {

        if (configStore.configExists(id)) {
            return configStore.getConfigById(id);
        };
        
        const res = await apiClient.get(`/config/${id}`);

        if (configStore.isPopulated()) {
            configStore.state.configs!.push(res.data.config);                
        } else {
            configStore.state.configs = [res.data.config];
        }

        if (res.status !== 200) {
            return null;
        }

        return res.data.config;
    },

    getConfigById: (id: number) => {

        return configStore.state.configs?.find(c => c.id === id);

    },

    configExists: (id: number) => {

        return configStore.state.configs?.find(c => c.id === id) !== undefined;

    }

}