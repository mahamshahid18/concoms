import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import { SpecialityChipIcon } from '..';
import { Company, Speciality } from '../../shared/types';

interface Props {
    company: Company;
}

const useStyles = makeStyles({
    companyCardContainer: {
        display: 'flex',
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
        backgroundColor: 'white',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12)',
        borderRadius: '0.25rem',
        padding: '1rem 1rem',

        '&:hover': {
            backgroundColor: '#F7F6F2'
        }
    },
    companyName: {
        fontSize: '1.25rem',
        lineHeight: '1.25rem',
    },
    companyCity: {
        fontSize: '1rem',
        lineHeight: '1.25rem',
        color: '#595F72'
    },
    locationPinIcon: {
        fontSize: '1.25rem',
        color: '#595F72'
    },
    logoImage: {
        marginBottom: '0.75rem',

        ['@media screen and (min-width: 992px)']: {
            maxWidth: '120px',
            maxHeight: '100px',
            marginBottom: 'unset'
        }
    }
});

export const CompanyCard = ({ company: { company_name, image, city, specialities } }: Props) => {
    const classes = useStyles();

    return (
        <Grid container justifyContent='center'>
            <Grid
                item
                xs={10}
                md={10}
                lg={8}
                xl={7}
                container
                className={classes.companyCardContainer}
                my={3}
            >
                <Grid item container direction='column' xs={12} md={2} lg={2}>
                    <img alt='company-logo' className={classes.logoImage} src={image} />
                </Grid>
                <Grid
                    item
                    container
                    direction='column'
                    xs={12}
                    md={10}
                    lg={10}
                >
                    <Box display='flex'>
                        <span className={classes.companyName}>
                            {company_name}
                        </span>
                    </Box>
                    <Box mt={2} display='flex' alignItems='flex-start'>
                        <Box className={classes.locationPinIcon}>
                            <LocationOnIcon fontSize='inherit' />
                        </Box>
                        <Box ml={0.25} display='flex' alignItems='flex-start'>
                            <span className={classes.companyCity}>
                                {city}
                            </span>
                        </Box>
                    </Box>
                    <Box mt={3} display='flex' flexWrap='wrap'>
                        {
                            specialities.map((speciality: Speciality, index: number) => {
                                return (
                                    <Box mr={1} mt={1} key={index}>
                                        <Chip icon={<SpecialityChipIcon speciality={speciality} />} label={speciality} size='small' color='info' />
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
}
