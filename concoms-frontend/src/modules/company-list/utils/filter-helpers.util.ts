import { availableSpecialities, Company, Speciality } from "../../shared";

export const arrangeCompaniesInBucketsOfSpecialities = (companiesList: Company[]): Map<Speciality, Company[]> => {
    const bucketOfSpecialitiesMap = new Map<Speciality, Company[]>();

    for (let speciality of availableSpecialities) {
        bucketOfSpecialitiesMap.set(speciality, []);
    }

    for (let company of companiesList) {
        const companySpecialities = company?.specialities;

        for (let companySpeciality of companySpecialities) {
            const companiesWithCurrentSpeciality = bucketOfSpecialitiesMap.get(companySpeciality);

            if (!companiesWithCurrentSpeciality?.includes(company)) {
                companiesWithCurrentSpeciality?.push(company);
            }
        }
    }

    return bucketOfSpecialitiesMap;
}

export const getCompaniesWithSelectedSpeciality = (selectedSpecialities: Speciality[], bucketOfSpecialitiesMap: Map<Speciality, Company[]>): Company[] => {
    if (!bucketOfSpecialitiesMap || !!!bucketOfSpecialitiesMap.size) {
        return [];
    }

    let companiesArray: Company[] = [];

    for (let selectedSpeciality of selectedSpecialities) {
        const bucketOfSelectedSpeciality = bucketOfSpecialitiesMap.get(selectedSpeciality);
        companiesArray = [
            ...companiesArray,
            ...bucketOfSelectedSpeciality as Company[]
        ]
    }

    return Array.from(new Set(companiesArray));
}