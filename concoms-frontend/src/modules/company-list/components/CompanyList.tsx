import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import { makeStyles } from '@mui/styles';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { CompanyCard } from '.';
import { getIconForSpeciality } from '..';
import { Company } from '../../shared/types';
import { useGetCompanies } from '../../../api-client';
import { availableSpecialities, CardSkeletonLoader, FeedbackMessage } from '../../shared';


const useStyles = makeStyles({
    searchInput: {
        backgroundColor: 'white',
        borderRadius: '0.25rem'
    },
    filterButtonContainer: {
        backgroundColor: 'white',
        borderRadius: '0.25rem'
    }
});

export const CompanyList = () => {
    const classes = useStyles();

    const { data: companiesList, isLoading, isError } = useGetCompanies();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [specialitiesSelected, setSpecialitiesSelected] = useState<string[]>([]);
    const [isFilterButtonToggled, setIsFilterButtonToggled] = useState<boolean>(false);
    const [filteredCompaniesList, setFilteredCompaniesList] = useState<Company[]>([]);

    useEffect(() => {
        setFilteredCompaniesList(companiesList as Company[]);
    }, [companiesList]);

    useEffect(() => {
        if (companiesList) {
            const companiesMatchingFiltersSelected: Company[] = [];

            for (let company of companiesList as Company[]) {
                for (let speciality of specialitiesSelected) {
                    const companySpecialitiesString = company?.specialities.toString();

                    if (companySpecialitiesString.includes(speciality)) {
                        companiesMatchingFiltersSelected.push(company);
                        break;
                    }
                }
            }

            setFilteredCompaniesList(companiesMatchingFiltersSelected.length ? companiesMatchingFiltersSelected as Company[] : companiesList);
        }
    }, [specialitiesSelected]);

    useEffect(() => {
        const companiesMatchingSearchTerm = companiesList?.filter((company: Company) => company?.company_name.toLowerCase().includes(searchTerm));

        setFilteredCompaniesList(companiesMatchingSearchTerm as Company[]);
    }, [searchTerm]);


    const handleChipClick = (event: any) => {
        const optionClicked = event.target.textContent;

        if (specialitiesSelected.includes(optionClicked)) {
            setSpecialitiesSelected(specialitiesSelected.filter(option => option !== optionClicked));
        } else {
            setSpecialitiesSelected([
                ...specialitiesSelected,
                optionClicked
            ]);
        }
    }

    const handleSearchChange = (event: any) => {
        const value = event.target.value;

        setSearchTerm(value.toLowerCase());
    }

    const isFilterSelected = (filterOption: string) => {
        return specialitiesSelected.includes(filterOption);
    };


    if (isLoading) {
        return (
            <Box mt={4}>
                {
                    [1, 2, 3, 4, 5, 6].map(() => {
                        return (
                            <CardSkeletonLoader />
                        )
                    })

                }
            </Box>
        )
    }

    if (isError && !filteredCompaniesList) {
        return (
            <Box mt={4}>
                <FeedbackMessage message='Error fetching data :(' />
            </Box>
        );
    }

    return (
        <React.Fragment>
            <Grid container flexDirection='column' lg={12}>
                <Box mt={3} mb={5} px={3} display='flex' justifyContent='center'>
                    <Typography variant='h4'>
                        Construction Companies
                    </Typography>
                </Box>
                <Grid
                    container
                    display='flex'
                    flexDirection='row'
                    justifyContent='center'
                    alignItems='flex-start'
                    my={4}
                >
                    <Box mx={3}>
                        <TextField
                            placeholder="Search for a company name"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                            variant="outlined"
                            className={classes.searchInput}
                            onChange={handleSearchChange}

                        />
                    </Box>
                    <Box mx={3} className={classes.filterButtonContainer}>
                        <Badge variant="dot" invisible={!!!specialitiesSelected.length}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            color='info'
                        >
                            <ToggleButton
                                value="check"
                                selected={isFilterButtonToggled}
                                onChange={() => setIsFilterButtonToggled(!isFilterButtonToggled)}
                                color='primary'
                            >
                                <FilterAltOutlinedIcon />
                            </ToggleButton>
                        </Badge>
                    </Box>
                </Grid>
                {
                    isFilterButtonToggled && (
                        <Grid container mb={7} display='flex' justifyContent='center' px={2}>
                            {
                                availableSpecialities.map((speciality) => {
                                    const chipIcon = getIconForSpeciality(speciality);

                                    return (
                                        <Box mr={1} mt={1}>
                                            <Chip
                                                icon={chipIcon}
                                                label={speciality}
                                                size='medium'
                                                color='info'
                                                variant={isFilterSelected(speciality) ? 'filled' : 'outlined'}
                                                onClick={handleChipClick}
                                            />
                                        </Box>
                                    );
                                })
                            }
                        </Grid>
                    )
                }
                <Box mt={4}>
                    {
                        filteredCompaniesList?.length && (
                            filteredCompaniesList.map((company: Company) => {
                                return <CompanyCard company={company} />;
                            })
                        )
                    }
                </Box>
            </Grid>
        </React.Fragment>
    );
}
