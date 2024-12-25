


export interface LoginGateway {
    auth(username: string, password: string): Promise<string>;
};