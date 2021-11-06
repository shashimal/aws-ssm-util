import {createReadStream, mkdirSync, writeFileSync} from "fs";
import parse from "csv-parse";
import {SSMConfig} from "./config/ssm-config";
import {ParameterList} from "aws-sdk/clients/ssm";
import {json2csv} from "json-2-csv";
import * as fs from "fs";

export class EcsService {

    constructor() {
        console.log("ECS")
    }

    public createEcsSecrets = async (fileObject: any[]) => {
        let csvData: any = [];
        const filePath = `data/${SSMConfig.folder}/import/${SSMConfig.env}/${fileObject[0].file}`;

        //Read CSV file
        createReadStream(filePath)
            .pipe(parse({delimiter: ','}))
            .on('data', function (csvrow) {
                csvData.push(csvrow);
            })
            .on('end', async function () {
                let secrets =[];
                for (let i=1; i < csvData.length; i++) {
                    const name = `/${SSMConfig.appName.toUpperCase()}/${SSMConfig.env.toUpperCase()}/${fileObject[0].module.toUpperCase()}/${csvData[i][1].toUpperCase()}`;

                    const jsonObject = {
                        name: `${csvData[i][1]}`,
                        ssmKey: `${csvData[i][1]}`,
                        ssmKeyType: `SsmKeyTypes.${csvData[i][3]}`,
                        version: [
                            {
                                env: "EnvTypes.dev",
                                value: 1
                            },
                            {
                                env: "EnvTypes.uat",
                                value: 1
                            },
                            {
                                env: "EnvTypes.prod",
                                value: 1
                            }
                        ]

                    }
                    secrets.push(jsonObject)
                    
                    // const ssmParam = {
                    //     Name: name,
                    //     Value: csvData[i][2],
                    //     Tier: 'Standard',
                    //     Type: csvData[i][3],
                    //     ...(csvData[i][3] === 'SecureString' && {KeyId: SSMConfig.kmsKeyId}),
                    //     Overwrite: true
                    // }

                    try {
                        const data = JSON.stringify(secrets);
                        const location = `data/${SSMConfig.folder}/ecs/${SSMConfig.env}`;
                        mkdirSync(location, {recursive: true});
                        // @ts-ignore
                        //fs.writeFile('myjsonfile.json', data);
                        const fileName = `${fileObject[0].module}.json`
                        writeFileSync(`${location}/${fileName}`, data);

                        console.log(data)
                    } catch (err) {
                        console.log(err)
                    }
                    
                }

            });

    }


}