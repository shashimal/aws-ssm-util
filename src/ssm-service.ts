import {SSM} from "aws-sdk";
import {SSMConfig} from "./config/ssm-config";
import {ParameterList} from "aws-sdk/clients/ssm";
import {json2csv} from "json-2-csv";
import {createReadStream, mkdirSync, writeFileSync} from "fs";
import parse from "csv-parse";

export class SsmService {

    private readonly ssm: SSM;

    constructor() {
        this.ssm = new SSM({
            region: SSMConfig.region,
            accessKeyId: SSMConfig.awsAccessKeyId,
            secretAccessKey: SSMConfig.awsSecretAccessKey,
            ...(SSMConfig.awsSessionToken && {sessionToken: SSMConfig.awsSessionToken}),
        });
    }

    /*
    * Import SSM parameters by module
    *
    * */
    public importSSMParameters = async (importData: any[]) => {
        for (let importObj of importData) {
            await this.readCSVFile(this.ssm, importObj);
        }
    }

    /*
    * Export SSM parameters by path
    *
    * */
    public exportSSMParametersAsCSV = async (exportParamsPaths: string[]) => {
        for (let path of exportParamsPaths) {
            const parameters: ParameterList = await this.getParametersByPath(path);

            if (parameters && parameters.length > 0) {
                this.writeToCsv(path, parameters);
            }
        }
    }

    /*
    * Delete SSM parameters by path
    *
    * */
    public deleteSSMParameters = async (deleteData: any) => {
        for (let deleteParam of deleteData) {
            const param = {
                Name: deleteParam
            }
            const response = await this.ssm.deleteParameter(param,
                (error, data) => {
                    if (error) {
                        console.log(`❌ Failed to delete : ${error}`);
                    } else {
                        console.log(`✅  Deleted: ${deleteParam}`);
                    }
                }
            );
        }
    }

    private getParametersByPath = async (path: string) => {
        try {
            let params = {
                Path: path.toUpperCase(),
                WithDecryption: true,
                Recursive: true,
            }

            let allParameters: ParameterList = [];
            let data = await this.ssm.getParametersByPath(params).promise();

            allParameters.push.apply(allParameters, data.Parameters!);

            while (data.NextToken) {
                // @ts-ignore
                params.NextToken = data.NextToken;
                data = await this.ssm.getParametersByPath(params).promise();
                allParameters.push.apply(allParameters, data.Parameters!);
            }
            return allParameters;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }

    private writeToCsv = (path: string, parameters: ParameterList) => {
        const fileName = path.split('/').join(' ')
            .trim().replace(new RegExp(' ', 'g'), '_')
            .concat(".csv")
            .toLowerCase();

        const location = `data/${SSMConfig.folder}/export/${SSMConfig.env}`;

        mkdirSync(location, {recursive: true});

        const filteredData = this.filterColumns(parameters);

        json2csv(filteredData, (err, csv) => {
            if (err) {
                console.log(`❌ Export Error ${path}`);
                throw err;
            }
            writeFileSync(`${location}/${fileName}`, csv!);
            console.log(`✅  Exported: ${path}`);
        });
    }

    private filterColumns = (parameters: ParameterList) => {
        const csvData: CsvData[] = [];
        for (let param of parameters) {

            const paramPath = param.Name!.split("/");

            let csvObject = {
                Module: paramPath[3],
                Name: paramPath[paramPath.length - 1],
                Value: param.Value,
                Type: param.Type,
                Path: param.Name
            }
            csvData.push(csvObject);
        }
        return csvData;
    }

    private readCSVFile = async (ssmClient: SSM, fileObject: any) => {
        let csvData: any = [];
        let count =0;
        let failedCount = 0;
        let successCount = 0;

        const filePath = `data/${SSMConfig.folder}/import/${SSMConfig.env}/${fileObject.file}`;

        createReadStream(filePath)
            .pipe(parse({delimiter: ','}))
            .on('data', function (csvrow) {
                csvData.push(csvrow);
            })
            .on('end', async function () {
                for (let i=1; i < csvData.length; i++) {
                    const name = `/${SSMConfig.appName.toUpperCase()}/${SSMConfig.env.toUpperCase()}/${fileObject.module.toUpperCase()}/${csvData[i][0].toUpperCase()}`;
                    const ssmParam = {
                        Name: name,
                        Value: csvData[i][1],
                        Tier: 'Standard',
                        Type: csvData[i][2],
                        ...(csvData[i][2] === 'SecureString' && {KeyId: SSMConfig.kmsKeyId}),
                        Overwrite: true
                    }

                    try {
                        const data = await ssmClient.putParameter(ssmParam).promise();
                        successCount++;
                        console.log(`✅  Imported Version ${data.Version}: ${name}`);
                    } catch (err) {
                        failedCount++;
                        console.log(`❌ Import Error ${fileObject.module} : ${err}`);
                    }
                    count++;
                }

                console.log(`#######################################################################`);
                console.log(`Total Parameters: ${count}`);
                console.log(`✅  Success Count for ${fileObject.module.toUpperCase()}: ${successCount}`);
                console.log(`❌  Failed Count for ${fileObject.module.toUpperCase()}: ${failedCount}`);
                console.log(`#######################################################################`);
            });
    }
}

export interface CsvData {
    Path?: string,
    Name?: string,
    Type?: string,
    Value?: string,
    Module?: string
}