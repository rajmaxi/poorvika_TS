interface servicerops {
    name?: string;
    enthusiasmLevel?: number;
    componentId?: string;
    options?: any;
}
type servicetypes = {
    centerName?: string,
    area_id?: string,
    brand_id?: string,
    value?: string,
    region_id?: string,
    state_id?: string,
    

    // success: number, error: Array<string>, brands: Array<{ category_id: string, name: string, image: string }>
}
type serviceRender = {
    centerName?: string,
    centerAddress?: string,
    area?: string,
    region?: string,
    phone_number?: string,
    // success: number, error: Array<string>, brands: Array<{ category_id: string, name: string, image: string }>
}

type servicetypess = NavigationComponent<servicerops>;