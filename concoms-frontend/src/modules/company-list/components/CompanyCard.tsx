import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import { makeStyles } from '@mui/styles';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { Company } from '../../../types';

interface Props {
    company: Company;
}

const useStyles = makeStyles({
    container: {
        display: 'flex',
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
        backgroundColor: 'white',
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14),0px 1px 3px 0px rgba(0,0,0,.12)',
        borderRadius: '4px',
        padding: '1rem 1rem',

        '&:hover': {
            backgroundColor: '#F7F6F2'
        }
    },
    overflowEllipsis: {
        maxWidth: '75vw',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
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
                container
                xs={10}
                md={10}
                lg={8}
                spacing={2}
                className={classes.container}
            >
                <Grid container direction='column' xs={12} md={2} lg={2}>
                    <img className={classes.logoImage} src={image} />
                </Grid>
                <Grid
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
                    <Box mt={3} display='flex'>
                        {
                            specialities.map((speciality: string) => {
                                return (
                                    <Box mr={1}>
                                        <Chip icon={<ControlPointIcon />} label={speciality} size='small' color='info' />
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
