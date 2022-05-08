export interface Rental {
    id: number;
    id_user: number;
    id_accommodation: number;
    guests: number;
    price: number;
    nights: number;
    purchase_date: string;
    start_date: string;
    end_date: string;
}