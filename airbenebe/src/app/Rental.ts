export interface Rental {
    id: number;
    id_user: number;
    id_accommodation: number;
    guests: number;
    price: number;
    nights: number;
    purchase_date: Date;
    start_date: Date;
    end_date: Date;
}