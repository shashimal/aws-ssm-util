import {IProjectConfig} from "../project-config";

export const AvenueConfig: IProjectConfig = {
    config: [
        {
            appName: 'Avenue',
            env: "UAT",
            region: "us-east-1",
            awsAccessKeyId: "AKIA3RLXXMFWVOZWY55E",
            awsSecretAccessKey: "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",
            //awsSessionToken: "",
            kmsKeyId: "",
            folder: "avenue",
            importFile: "import.csv",
            exportPath: "/AVENUE",
            deleteFile: ""
        },
        {
            appName: 'Avenue',
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