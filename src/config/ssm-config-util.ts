import {ISsmConfig} from "./ssm-config";
import {SsbParams} from "./projects/ssb-params";
import {AvenueParams} from "./projects/avenue-params";
import {TangoParams} from "./projects/tango-params";

export class SsmConfigUtil {

    public static getProjectConfig = (projectName: string): ISsmConfig | undefined => {
        switch (projectName) {
            case 'SCB':
                return SsbParams;
            case 'AVENUE':
                return AvenueParams;
            case 'TANGO':
                return TangoParams;
            default:
                return undefined;
        }
    }
}