export interface IEnvironment {
    NODE_ENV?: 'staging' | 'production' | 'development'
    ATLAS_URI: string | undefined
    SECRET: string | undefined
}