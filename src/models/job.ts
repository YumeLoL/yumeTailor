export interface JobParamsType {
    page: number;
    limit: number;
    location?: string | null | undefined;
    type?: number | null | undefined;
}

export interface IJob {
    id: string;
    user_id: string;
    name: string;
    cloth_type: number;
    location: string;
    description: string
    budget: number;
    status: boolean
    quotation_count: number;
    created_at: string;
    updated_at: string;
}