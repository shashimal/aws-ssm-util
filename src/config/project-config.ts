import {SsmParams} from "./ssm-params";

export interface IProjectConfig {
    config: IConfig[]
}

export interface IConfig {
    appName: string
    env: string,
    region: string,
    awsAccessKeyId: string,
    awsSecretAccessKey: string,
    awsSessionToken?: string,
    kmsKeyId: string,
    folder: string,
    importFile?: string,
    exportPath?: string,
    deleteFile?: string
}