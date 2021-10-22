import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Company } from '../../../types';
import { useGetCompanies } from '../../../api-client';
import { CardSkeletonLoader, FeedbackMessage } from '../../shared';
import { CompanyCard } from '.';

export const CompanyList = () => {
    const { data: companiesList, isLoading, isError } = useGetCompanies();

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

    if (isError && !companiesList) {
        return (
            <Box mt={4}>
                <FeedbackMessage message='Error fetching data :(' />
            </Box>
        );
    }

    return (
        <React.Fragment>
            <Box mt={3} mb={5} display='flex' justifyContent='center'>
                <Typography variant='h4'>
                    List of companies
                </Typography>
            </Box>
            <Box mt={3}>
                {
                    companiesList?.length && (
                        companiesList.map((company: Company) => {
                            return <CompanyCard company={company} />;
                        })
                    )
                }
            </Box>
        </React.Fragment>
    );
}
