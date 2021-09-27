
export interface ISsmConfig {
    region: string;
    awsAccessKeyId: string,
    awsSecretAccessKey: string;
    awsSessionToken?: string;
    env: string
    enabled?: boolean;
    folder: string;
    appName: string;
    kmsKeyId?: string;
    importParams?: IImportParams[];
    exportParams?: string[];
    deleteParams?: string[];
}

export interface IImportParams {
    file: string,
    module: string,
}