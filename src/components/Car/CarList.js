import React, { useEffect, useState } from 'react';
import { getCars } from '../../api/api';
import { Container, Typography, Grid, Card, CardContent, Button, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);  // Add a loading state
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await getCars();
                console.log(data);
                setCars(data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access:", error);
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    console.error("Failed to fetch cars:", error);
                }
            } finally {
                setLoading(false);  // Set loading to false once the fetch completes
            }
        };

        // Re-fetch cars if `addedCar` state exists or on mount
        if (location.state?.addedCar || cars.length === 0 || location) {
            fetchCars();
        } else {
            setLoading(false);  // If no need to fetch, stop loading
        }
    }, [navigate, location]);

    const handleAddNewCar = () => {
        navigate('/cars/new'); // Adjust this route to match your car form page route
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                <Typography variant="h4" gutterBottom>My Cars</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNewCar}
                    sx={{ marginBottom: 3 }}
                >
                    Add New Car
                </Button>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {cars.map((car) => (
                            <Grid item key={car.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': { transform: 'scale(1.05)' },
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>{car.title}</Typography>
                                        <Button
                                            component={Link}
                                            to={`/cars/${car._id}`}
                                            variant="outlined"
                                            sx={{ marginTop: 2, '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default CarList;
