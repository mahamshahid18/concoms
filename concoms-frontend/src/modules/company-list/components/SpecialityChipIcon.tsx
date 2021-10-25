import React from 'react';

import AirOutlinedIcon from '@mui/icons-material/AirOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CarpenterOutlinedIcon from '@mui/icons-material/CarpenterOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import BatteryCharging60OutlinedIcon from '@mui/icons-material/BatteryCharging60Outlined';
import { makeStyles } from '@mui/styles';

import { Speciality } from "../../shared";

export interface Props {
    speciality: Speciality;
}

const useStyles = makeStyles({
    iconContainer: {
        paddingTop: '16px',
        paddingBottom: '14px',
        paddingLeft: '5px'
    },
});

export const SpecialityChipIcon = ({ speciality }: Props) => {
    const classes = useStyles();
    let icon;

    switch (speciality) {
        case Speciality.Plumbing:
            icon = <BathtubOutlinedIcon />;
            break;
        case Speciality.Heating:
            icon = <AirOutlinedIcon />;
            break;
        case Speciality.Flooring:
            icon = <CarpenterOutlinedIcon />;
            break;
        case Speciality.Electrical:
            icon = <BatteryCharging60OutlinedIcon />;
            break;
        case Speciality.Excavation:
            icon = <ConstructionOutlinedIcon />;
            break;
        default:
            return <ConstructionOutlinedIcon />;
    }

    return (
        <span data-testid="speciality-icon" className={classes.iconContainer}>
            {icon}
        </span>
    );
}