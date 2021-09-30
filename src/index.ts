import {SsmService} from "./ssm-service";
import {SSMConfig} from "./config/ssm-config";

const main = async ()=> {
    const ssmHandler = new SsmService();
    //Export SSM parameters
    await  ssmHandler.exportSSMParametersAsCSV(SSMConfig.exportParams!);

    //Import SSM parameters from csv file.
    await ssmHandler.importSSMParameters(SSMConfig.importParams!);

    //Deleting SSM parameters by path
    await ssmHandler.deleteSSMParameters(SSMConfig.deleteParams);
}
main().then(()=> "Parameters imported");



