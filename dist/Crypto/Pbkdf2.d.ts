export declare const derivePasswordKey: (password: string, salt?: string | boolean, iterations?: number) => Promise<{
    key: any;
    salt: any;
}>;
