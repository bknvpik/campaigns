export interface Campaign {
    name: string;
    keywords: string[];
    details: {
        bid: number;
        fund: number;
        status: boolean;
        town: string;
        radius: number;
    }
};