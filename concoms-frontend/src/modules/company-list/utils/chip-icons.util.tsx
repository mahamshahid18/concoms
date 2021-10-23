import React from "react";

import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import BatteryCharging60OutlinedIcon from '@mui/icons-material/BatteryCharging60Outlined';

import { Speciality } from "../../shared";

export const getIconForSpeciality = (speciality: Speciality): React.ReactElement => {
    switch (speciality) {
        case Speciality.Plumbing:
            return <BathtubOutlinedIcon />;
        case Speciality.Heating:
            return <AirOutlinedIcon />;
        case Speciality.Flooring:
            return <CarpenterOutlinedIcon />;
        case Speciality.Electrical:
            return <BatteryCharging60OutlinedIcon />;
        case Speciality.Excavation:
            return <ConstructionOutlinedIcon />;
        default:
            return <ConstructionOutlinedIcon />;
    }
}