import React, { useEffect, useState } from 'react';
import { getCarById, deleteCar } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Grid, Card, CardMedia } from '@mui/material';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await getCarById(id);
                setCar(data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };
        fetchCar();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteCar(id);
            navigate('/cars');
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/cars/edit/${id}`); // Assuming an edit route exists like '/cars/edit/:id'
    };

    // Base URL for images
    const baseUrl = 'http://localhost:5000/'; // Replace with your actual server URL

    return (
        <Container maxWidth="sm">
            {car && (
                <Box
                    sx={{
                        marginTop: 5,
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white'
                    }}
                >
                    <Typography variant="h4" gutterBottom>{car.title}</Typography>
                    <Typography variant="body1" paragraph>{car.description}</Typography>

                    {/* Display Car Images */}
                    {car.images && car.images.length > 0 && (
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h6">Car Images</Typography>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                {car.images.map((image, index) => {
                                    // Replace backslashes with forward slashes
                                    const imageUrl = baseUrl + image.replace(/\\/g, '/'); 
                                    return (
                                        <Grid item key={index} xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    alt={`Car Image ${index + 1}`}
                                                    height="200"
                                                    image={imageUrl} // Use the constructed image URL
                                                    title={`Car Image ${index + 1}`}
                                                />
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )}

                    {/* Buttons */}
                    <Box sx={{ marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                            sx={{ marginRight: 2 }}
                        >
                            Edit Car
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete Car
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default CarDetail;
