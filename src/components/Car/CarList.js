
import React, { useEffect, useState } from 'react';
import { getCars } from '../../api/api';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button, Box, CircularProgress, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]); // Filtered list
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // Search query state
    const navigate = useNavigate();
    const location = useLocation();
    const baseUrl = 'https://car-backend-sftj.onrender.com/';

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const { data } = await getCars();
                setCars(data);
                setFilteredCars(data); // Initialize filteredCars
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized access:", error);
                    navigate('/login'); // Redirect to login if unauthorized
                } else {
                    console.error("Failed to fetch cars:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        if (location.state?.addedCar || cars.length === 0 || location) {
            fetchCars();
        } else {
            setLoading(false);
        }
    }, [navigate, location]);

    // Filter cars based on the search query
    useEffect(() => {
        const filtered = cars.filter((car) => {
            const titleMatch = car.title?.toLowerCase().includes(searchQuery.toLowerCase());
            const descriptionMatch = car.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const tagsMatch = car.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            return titleMatch || descriptionMatch || tagsMatch;
        });
        setFilteredCars(filtered);
    }, [searchQuery, cars]);

    const handleAddNewCar = () => {
        navigate('/cars/new');
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', marginTop: 5 }}>
                <Typography variant="h4" gutterBottom color="primary">My Cars</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNewCar}
                    sx={{ marginBottom: 3 }}
                >
                    Add New Car
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginBottom: 4,
                    }}
                >
                    <TextField
                        placeholder="Search for a car..."
                        variant="outlined"
                        fullWidth
                        sx={{
                            maxWidth: 500,
                            backgroundColor: 'white',
                            boxShadow: 1,
                            borderRadius: 3,
                        }}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {filteredCars.map((car) => (

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
                                        {/* Show only one image if multiple exist */}
                                        {car.images && car.images.length > 0 && (
                                            <Box sx={{ marginTop: 3 }}>
                                                <Typography variant="h6" color="textSecondary">Car Image</Typography>
                                                <CardMedia
                                                    component="img"
                                                    alt="Car"
                                                    height="200"
                                                    image={baseUrl + car.images[0].replace(/\\/g, '/')} // Show first image
                                                    title={`Car Image`}
                                                    sx={{
                                                        objectFit: 'cover',
                                                        borderRadius: 1,
                                                    }}

                                                />

                                            </Box>

                                        )}


                                        <Typography variant="h5" gutterBottom sx={{ marginTop: 2, fontWeight: 'bold' }}>
                                            {car.title}
                                        </Typography>
                                        <Button
                                            component={Link}
                                            to={`/cars/${car._id}`}
                                            variant="outlined"
                                            sx={{
                                                marginTop: 2,
                                                '&:hover': { backgroundColor: 'primary.main', color: 'white' },
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                padding: '8px 16px',
                                            }}
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
