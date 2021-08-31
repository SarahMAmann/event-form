import {Construct} from "@aws-cdk/core";
import {Settings} from "./settings";
import {ARecord, HostedZone, RecordTarget} from "@aws-cdk/aws-route53";
import {LoadBalancerTarget} from "@aws-cdk/aws-route53-targets";
import {ApplicationLoadBalancer} from "@aws-cdk/aws-elasticloadbalancingv2";

export interface IRoute53 {
    createRecordSetForALB(recordNamePrefix: string): void
}

export class Route53 implements IRoute53 {

    private readonly alb: ApplicationLoadBalancer
    private readonly scope: Construct;
    private readonly settings: Settings;
    private readonly env: string;

    constructor(scope: Construct, settings: Settings, alb: ApplicationLoadBalancer) {
        this.scope = scope;
        this.settings = settings;
        this.alb = alb;
        this.env = settings.environment;
    }

    public createRecordSetForALB = (recordNamePrefix: string): void => {
        const hostedZone = HostedZone.fromLookup(this.scope, `${this.env}-${recordNamePrefix}-hostedZone`, {
            domainName: this.settings.domainName
        });
        const albTarget = new LoadBalancerTarget(this.alb)

        new ARecord(this.scope, `${this.env}-${recordNamePrefix}-aRecord`, {
            recordName: `${recordNamePrefix}.${this.settings.domainName}`,
            zone: hostedZone,
            target: RecordTarget.fromAlias(albTarget)
        });
    };
}
