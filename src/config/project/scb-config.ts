import {IProjectConfig} from "../project-config";

export const ScbConfig: IProjectConfig = {
    config: [
        {
            appName: 'SCB',
            env: "UAT",
            region: "",
            awsAccessKeyId: "",
            awsSecretAccessKey: "",
            awsSessionToken: "",
            kmsKeyId: "",
            folder: "",
            importFile: "",
            exportPath: "",
            deleteFile: ""
        },
        {
            appName: 'SCB',
            env: "PROD",
            region: "",
            awsAccessKeyId: "",
            awsSecretAccessKey: "",
            awsSessionToken: "",
            kmsKeyId: "",
            folder: "",
            importFile: "",
            exportPath: "",
            deleteFile: ""
        }
    ]

}