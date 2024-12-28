

export type ReportProps = {
    dropoutPercentage: number;
    installedPercentage: number;
    dropout: number;
    installed: number;
    totalBase: number;
    totalProspect: number; 
    billing: number;
    total: number;
};


export class Report {

    private constructor(private readonly props: ReportProps) {};

    public static with(props: ReportProps) {
        return new Report(props);
    };

    public get dropoutPercentage() {
        return this.props.dropoutPercentage
    };

    public get installedPercentage() {
        return this.props.installedPercentage;
    };

    public get dropout() {
        return this.props.dropout;
    };

    public get installed() {
        return this.props.installed;
    };

    public get billing() {
        return this.props.billing;
    };

    public get total() {
        return this.props.total;
    };

    public get totalBase() {
        return this.props.totalBase;
    };

    public get totalProspect() {
        return this.props.totalProspect;
    };
}