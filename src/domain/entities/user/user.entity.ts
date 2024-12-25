import { v4 as uuid } from "uuid";

export type UserProps = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};


export class User {

    private constructor(private readonly props: UserProps) {};


    public static build(username: string, firstName: string, lastName: string, password: string) {
        return new User({
            id: uuid(),
            username,
            firstName,
            lastName,
            isAdmin: false,
            password,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    };

    public static with(props: UserProps) {
        return new User(props);
    };


    public get id() {
        return this.props.id;
    };

    public get username() {
        return this.props.username;
    };

    public get firstName() {
        return this.props.firstName;
    };

    public get lastName() {
        return this.props.lastName;
    };

    public get isAdmin() {
        return this.props.isAdmin;
    };

    public get password() {
        return this.props.password;
    };

    public get createdAt() {
        return this.props.createdAt;
    };

    public get updatedAt() {
        return this.props.updatedAt;
    };
};