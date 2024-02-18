declare module 'react-cookie' {
    export interface Cookies {
        get: (name: string) => string | undefined;
        set: (name: string, value: string | object, options?: object) => string | undefined;
        remove: (name: string, options?: object) => void;
        userId?: string;
    }

    const useCookies: (keys: string[], options?: object) => [Cookies, (name: string, value: string | object, options?: object) => void, (name: string, options?: object) => void];

    export { useCookies };
}
