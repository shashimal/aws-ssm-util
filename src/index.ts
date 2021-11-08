import {IConfig, IProjectConfig} from "./config/project-config";
import {AvenueConfig} from "./config/project/avenue-config";
import {ScbConfig} from "./config/project/scb-config";
import {TangoConfig} from "./config/project/tango-config";
import {DataProcessService} from "./service/data-process-service";


const main = async () => {

    const env = process.env.npm_config_env!.toUpperCase();
    const project = process.env.npm_config_project!.toUpperCase();
    const type =  process.env.npm_config_type!.toUpperCase();

    console.log(`Env: ${env}  Project: ${project} Type: ${type}`);

    if (!env || !project || !type) {
        console.log("env type, and  project parameters can't be empty");
    }

    const filterConfigObject = (projectConfig: IProjectConfig, env: string) => {
        return projectConfig.config.filter(config => {
            return config.env === env
        })
    }

    let config: IConfig[] | null;
    switch (project) {
        case 'AVENUE': {
            config = filterConfigObject(AvenueConfig, env);
            //console.log(config)
            break;
        }
        case 'SCB': {
            config = filterConfigObject(ScbConfig, env);
            console.log(config)
            break;
        }
        case 'TANGO': {
            config = filterConfigObject(TangoConfig, env);
            console.log(config)
            break;
        }
        default: {
            console.log("No config found");
            break;
        }
    }

    // @ts-ignore
    const dataProcessService = new DataProcessService(type, config);
    await dataProcessService.process();


}
main().then(() => "Parameters imported");




