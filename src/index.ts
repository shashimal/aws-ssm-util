import {SsmService} from "./ssm-service";
import {SsmConfigUtil} from "./config/ssm-config-util";

const main = async ()=> {

    const projectName = 'Test';
    const ssmParamsConfig  = SsmConfigUtil.getProjectConfig(projectName);

    const ssmHandler = new SsmService(ssmParamsConfig);
    //Export SSM parameters
    await  ssmHandler.exportSSMParametersAsCSV();

    //Import SSM parameters from csv file.
    //await ssmHandler.importSSMParameters();

    //Deleting SSM parameters by path
    //await ssmHandler.deleteSSMParameters();
}
main().then(()=> "Parameters imported");



