import {IConfig} from "../config/project-config";
import {SsmService} from "./ssm-service";

export class DataProcessService {

    private readonly processType: string;
    private readonly config: IConfig[];
    private ssmService: SsmService;

    constructor(processType: string, config: IConfig[]) {
        this.processType = processType;
        this.config = config
        this.ssmService = new SsmService();
    }

    public  process = async () => {

        switch (this.processType) {
            case 'SSM-IMPORT': {
                await this.ssmService.importSSMParameters(this.config);
                break;
            }
            case 'SSM-EXPORT': {
                await this.ssmService.exportSSMParametersAsCSV(this.config);
                break;
            }
            case 'SSM-DELETE': {
                break;
            }
        }
    }
}