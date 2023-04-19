export interface JobParamsType {
    page: number;
    limit: number;
    location?: string | null | undefined;
    type?: number | null | undefined;
}