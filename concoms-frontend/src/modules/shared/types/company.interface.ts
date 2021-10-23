import { Speciality } from ".";

export interface Company {
    company_name: string;
    image: string;
    city: string;
    specialities: Speciality[];
};
