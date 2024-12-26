import { v4 as uuid } from "uuid";
import { User } from "../user/user.entity";

export type TypeContract = "base" | "prospect";
export type Status = "pendente" | "conectado" | "cancelado";

export const TypeContract = {
    BASE: "base" as TypeContract,
    PROSPECT: "prospect"  as TypeContract
} as const;

export const Status = {
    PENDENTE: "pendente" as Status,
    CONECTADO: "conectado" as Status,
    CANCELADO: "cancelado" as Status
} as const;

export type ContractProps = {
    id: string;
    number: number;
    local: string;
    scheduleDate: Date;
    scheduleTime: string;
    observation: string;
    type: TypeContract;
    price: number;
    status: Status;
    contact: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
};


export class Contract {

    private constructor(private readonly props: ContractProps) {};

    public static build(
        number: number, 
        local: string, 
        scheduleDate: Date, 
        scheduleTime: string,
        observation: string,
        price: number,
        type: TypeContract,
        contact: string,
        userId: string
    ) {
        return new Contract({
            id: uuid(),
            number,
            local,
            scheduleDate,
            scheduleTime,
            observation,
            status: Status.PENDENTE,
            type,
            price,
            contact,
            userId,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    };


    public static with(props: ContractProps) {
        return new Contract(props);
    };


    public get id() {
        return this.props.id;
    };

    public get number() {
        return this.props.number;
    };

    public get local() {
        return this.props.local;
    };

    public get scheduleDate() {
        return this.props.scheduleDate;
    };

    public get scheduleTime() {
        return this.props.scheduleTime;
    };

    public get price() {
        return this.props.price;
    };

    public get observation() {
        return this.props.observation;
    };

    public get type() {
        return this.props.type;
    };

    public get status() {
        return this.props.status;
    };

    public get contact() {
        return this.props.contact;
    };

    public get userId() {
        return this.props.userId;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
}