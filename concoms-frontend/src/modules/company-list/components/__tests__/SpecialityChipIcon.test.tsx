import React from 'react';
import { render } from '@testing-library/react';

import { SpecialityChipIcon } from '..';
import { Speciality } from '../../../shared';


function renderSpecialityChipIcon(speciality: Speciality) {
    return render(<SpecialityChipIcon speciality={speciality} />);
}

test("should display plumbing icon", async () => {
    const { findByTestId } = renderSpecialityChipIcon(Speciality.Plumbing);


    const icon = await findByTestId("speciality-icon");
    const plumbingIcon = await findByTestId("BathtubOutlinedIcon");

    expect(icon).toContainElement(plumbingIcon);
});

test("should display heating icon", async () => {
    const { findByTestId } = renderSpecialityChipIcon(Speciality.Heating);


    const icon = await findByTestId("speciality-icon");
    const heatingIcon = await findByTestId("AirOutlinedIcon");

    expect(icon).toContainElement(heatingIcon);
});

test("should display flooring icon", async () => {
    const { findByTestId } = renderSpecialityChipIcon(Speciality.Flooring);


    const icon = await findByTestId("speciality-icon");
    const flooringIcon = await findByTestId("CarpenterOutlinedIcon");

    expect(icon).toContainElement(flooringIcon);
});

test("should display electrical icon", async () => {
    const { findByTestId } = renderSpecialityChipIcon(Speciality.Electrical);


    const icon = await findByTestId("speciality-icon");
    const electtricalIcon = await findByTestId("BatteryCharging60OutlinedIcon");

    expect(icon).toContainElement(electtricalIcon);
});

test("should display excavation icon", async () => {
    const { findByTestId } = renderSpecialityChipIcon(Speciality.Excavation);


    const icon = await findByTestId("speciality-icon");
    const excavationIcon = await findByTestId("ConstructionOutlinedIcon");

    expect(icon).toContainElement(excavationIcon);
});