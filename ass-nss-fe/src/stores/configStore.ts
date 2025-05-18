import { apiClient } from "@/api";
import type { Config } from "@/api/types";

// this store is used in order to locally store configurations, in order to be able to display them in the table
// it is a combination of reactive state property and functions that manipulate it

export const configStore = {    
    state: reactive({
        configs: null as Config[] | null,
    }), 

    // this function is called in order to find out if the store is populated
    isPopulated: () => {

        return configStore.state.configs !== null;

    },

    // this function is called in order to populate the store with singe config data
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

    // this function is called to get config by id
    getConfigById: (id: number) => {

        return configStore.state.configs?.find(c => c.id === id);

    },

    // this function is called to check if config with given id exists
    configExists: (id: number) => {

        return configStore.state.configs?.find(c => c.id === id) !== undefined;

    }

}