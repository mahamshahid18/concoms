import React from "react";

import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import BatteryCharging60OutlinedIcon from '@mui/icons-material/BatteryCharging60Outlined';

export const getIconForSpeciality = (speciality: string): React.ReactElement => {
    switch (speciality) {
        case 'plumbing':
            return <BathtubOutlinedIcon />;
        case 'heating':
            return <AirOutlinedIcon />;
        case 'flooring':
            return <CarpenterOutlinedIcon />;
        case 'electrical':
            return <BatteryCharging60OutlinedIcon />;
        case 'excavation':
            return <ConstructionOutlinedIcon />;
        default:
            return <ConstructionOutlinedIcon />;
    }
}