import {IProjectConfig} from "../project-config";

export const DunhillConfig: IProjectConfig = {
    config: [
        {
            appName: 'DUNHILL',
            env: "dev",
            region: "ap-southeast-1",
            awsAccessKeyId: "",
            awsSecretAccessKey: "",
            awsSessionToken: "",
            kmsKeyId: "arn:aws:kms:ap-southeast-1:475226339679:key/b6126fc7-490a-4309-9d46-d1cefedf44b0",
            folder: "dunhill",
            importFile: "import.csv",
            exportPath: "",
            deleteFile: ""
        },
    ]

}