import {SsmParams} from "./ssm-params";

export const SSMConfig: ISsmParams = {
    awsAccessKeyId: "",
    awsSecretAccessKey: "",
    awsSessionToken: '',
    enabled: false,
    folder: 'demo',
    appName: 'MyApp',
    env: 'uat',
    region: 'us-east-1',
    kmsKeyId: "",
    importParams: SsmParams.importParams,
    exportParams: SsmParams.exportParams,
    deleteParams: SsmParams.deleteParams
}

export interface ISsmParams {
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