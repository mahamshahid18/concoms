import { arrangeCompaniesInBucketsOfSpecialities, getCompaniesWithSelectedSpeciality } from ".."
import { Company, Speciality } from "../../../shared";

const companies: Company[] = [
    {
        company_name: 'Company A',
        image: '',
        city: 'Berlin',
        specialities: [Speciality.Electrical, Speciality.Flooring]
    },
    {
        company_name: 'Company B',
        image: '',
        city: 'Berlin',
        specialities: [Speciality.Excavation]
    },
    {
        company_name: 'Company C',
        image: '',
        city: 'Munich',
        specialities: [Speciality.Plumbing, Speciality.Flooring, Speciality.Heating]
    },
    {
        company_name: 'Company D',
        image: '',
        city: 'Cologne',
        specialities: [Speciality.Heating, Speciality.Flooring]
    },
    {
        company_name: 'Company E',
        image: '',
        city: 'London',
        specialities: [Speciality.Heating, Speciality.Electrical, Speciality.Plumbing]
    }
];

const mapOfCompanies = arrangeCompaniesInBucketsOfSpecialities(companies);

describe('arrangeCompaniesInBucketsOfSpecialities', () => {
    it('should return a map with empty array values if companies list is not present', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities([]);

        expect(bucketOfSpecialities.get(Speciality.Electrical)?.length).toBe(0)
        expect(bucketOfSpecialities.get(Speciality.Excavation)?.length).toBe(0);
        expect(bucketOfSpecialities.get(Speciality.Flooring)?.length).toBe(0);
        expect(bucketOfSpecialities.get(Speciality.Heating)?.length).toBe(0);
        expect(bucketOfSpecialities.get(Speciality.Plumbing)?.length).toBe(0);
    });
    it('should return the correct companies for electrical category', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities(companies);
        const bucketForElectrical: Company[] = bucketOfSpecialities.get(Speciality.Electrical) as Company[];

        expect(bucketForElectrical?.length).toBe(2);
        expect(bucketForElectrical[0]?.company_name).toEqual('Company A');
        expect(bucketForElectrical[1]?.company_name).toEqual('Company E');
    });
    it('should return the correct companies for excavation category', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities(companies);
        const bucketForExcavation: Company[] = bucketOfSpecialities.get(Speciality.Excavation) as Company[];

        expect(bucketForExcavation?.length).toBe(1);
        expect(bucketForExcavation[0]?.company_name).toEqual('Company B');
    });
    it('should return the correct companies for flooring category', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities(companies);
        const bucketForFlooring: Company[] = bucketOfSpecialities.get(Speciality.Flooring) as Company[];

        expect(bucketForFlooring?.length).toBe(3);
        expect(bucketForFlooring[0]?.company_name).toEqual('Company A');
        expect(bucketForFlooring[1]?.company_name).toEqual('Company C');
        expect(bucketForFlooring[2]?.company_name).toEqual('Company D');
    });
    it('should return the correct companies for heating category', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities(companies);
        const bucketForHeating: Company[] = bucketOfSpecialities.get(Speciality.Heating) as Company[];

        expect(bucketForHeating?.length).toBe(3);
        expect(bucketForHeating[0]?.company_name).toEqual('Company C');
        expect(bucketForHeating[1]?.company_name).toEqual('Company D');
        expect(bucketForHeating[2]?.company_name).toEqual('Company E');
    });
    it('should return the correct companies for plumbing category', () => {
        const bucketOfSpecialities = arrangeCompaniesInBucketsOfSpecialities(companies);
        const bucketForPlumbing: Company[] = bucketOfSpecialities.get(Speciality.Plumbing) as Company[];

        expect(bucketForPlumbing?.length).toBe(2);
        expect(bucketForPlumbing[0]?.company_name).toEqual('Company C');
        expect(bucketForPlumbing[1]?.company_name).toEqual('Company E');
    });
});

describe('getCompaniesWithSelectedSpeciality', () => {
    it('should return an empty array if bucket is not passed in', () => {
        expect(
            getCompaniesWithSelectedSpeciality(
                [
                    Speciality.Plumbing
                ],
                new Map()
            )
        ).toHaveLength(0);
    });
    it('should return the correct companies for one selected speciality', () => {
        const companiesWithSelectedSpeciality = getCompaniesWithSelectedSpeciality(
            [
                Speciality.Plumbing
            ],
            mapOfCompanies
        );

        expect(companiesWithSelectedSpeciality).toHaveLength(2);
        expect(companiesWithSelectedSpeciality[0]?.company_name).toEqual('Company C');
        expect(companiesWithSelectedSpeciality[1]?.company_name).toEqual('Company E');
    });
    it('should return the correct companies for two selected specialities', () => {
        const companiesWithSelectedSpeciality = getCompaniesWithSelectedSpeciality(
            [
                Speciality.Plumbing,
                Speciality.Heating
            ],
            mapOfCompanies
        );

        expect(companiesWithSelectedSpeciality).toHaveLength(3);
        expect(companiesWithSelectedSpeciality[0]?.company_name).toEqual('Company C');
        expect(companiesWithSelectedSpeciality[1]?.company_name).toEqual('Company E');
        expect(companiesWithSelectedSpeciality[2]?.company_name).toEqual('Company D');
    });
    it('should return the correct companies for three selected specialities', () => {
        const companiesWithSelectedSpeciality = getCompaniesWithSelectedSpeciality(
            [
                Speciality.Excavation,
                Speciality.Heating,
                Speciality.Flooring
            ],
            mapOfCompanies
        );

        expect(companiesWithSelectedSpeciality).toHaveLength(5);
        expect(companiesWithSelectedSpeciality[0]?.company_name).toEqual('Company B');
        expect(companiesWithSelectedSpeciality[1]?.company_name).toEqual('Company C');
        expect(companiesWithSelectedSpeciality[2]?.company_name).toEqual('Company D');
        expect(companiesWithSelectedSpeciality[3]?.company_name).toEqual('Company E');
        expect(companiesWithSelectedSpeciality[4]?.company_name).toEqual('Company A');
    });
    it('should return the correct companies for three selected specialities', () => {
        const companiesWithSelectedSpeciality = getCompaniesWithSelectedSpeciality(
            [
                Speciality.Electrical,
                Speciality.Excavation
            ],
            mapOfCompanies
        );

        expect(companiesWithSelectedSpeciality).toHaveLength(3);
        expect(companiesWithSelectedSpeciality[0]?.company_name).toEqual('Company A');
        expect(companiesWithSelectedSpeciality[1]?.company_name).toEqual('Company E');
        expect(companiesWithSelectedSpeciality[2]?.company_name).toEqual('Company B');
    });
})