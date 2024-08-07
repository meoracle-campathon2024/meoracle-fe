export type Division = {
    id: number;
    parent_id: number | null;
    division_type_id: number;
    name: string;
    lat: number;
    lon: number;
    division_type: {
        id: number;
        country_id: number;
        name: string;
        level: number;
    };
    children: Division[];
};
