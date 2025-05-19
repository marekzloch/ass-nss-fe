// this file contains types that are used in the api
// if the app grows i would recommend to use openapi 
// in order to generate types from swagger json
// src: https://www.npmjs.com/package/openapi-typescript

export type Config = {
    id: number;
    interval_value: number;
    frequency: number;
    rgb_camera: boolean;
    hsi_camera: boolean;
    created_at: string;
};


export type Measurement = {
    id: number;
    created_at: string;
    acustic: number;
    snapshot_rgb_camera: string;
    snapshot_hsi_camera: string;
    config_id: number;
};

export type FetchStatus = 'idle' | 'loading' | 'success' | 'error';
