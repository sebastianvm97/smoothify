export interface LinkCreationPayload {
    url: string;
    expiresIn: string;
    isQR: boolean;
    needsAuth: boolean;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    urls: string[];
}

export interface URL {
    id: string;
    url: string;
    expiresIn: string;
    isQR: boolean;
    needsAuth: boolean;
}
