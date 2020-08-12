interface showroomprops {
    name?: string;
    enthusiasmLevel?: number;
    componentId?: string;
    options?: any;
}
type showroomtype = {
    showroom_state_id?: string,
    showroom_city_id?: string,
    showroom_city_name?: string,
    showroom_state_name?: string,
    showroom_area_id?: string,
    showroom_area_name?: string,
    value?: string
    // success: number, error: Array<string>, brands: Array<{ category_id: string, name: string, image: string }>
}
type detailsRender = {
    name?: string,
    address1?: string,
    address2?: string,
    showroom_area_id?: string,
    showroom_area_name?: string,
    showroom_state_name?: string,
    pincode?: string,
    image?: string,
    latitude: string,
    longitude: string
    // success: number, error: Array<string>, brands: Array<{ category_id: string, name: string, image: string }>
}

type showroomLocatetypes = NavigationComponent<showroomprops>;