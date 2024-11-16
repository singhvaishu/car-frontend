
import React, { useEffect, useState } from 'react';
import { getCarById, deleteCar } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Card, CardMedia, IconButton, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        navigate(`/cars/edit/${id}`);
    };

    // Handle Image Navigation
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length);
    };

    // Base URL for images
    const baseUrl = 'https://car-backend-sftj.onrender.com/'; // Replace with your actual server URL

    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}> {/* Decreased container size */}
            {car && (
                <Paper sx={{ padding: 2, borderRadius: 3, boxShadow: 4, backgroundColor: 'background.paper' }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {car.title}
                    </Typography>
                    <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                        {car.description}
                    </Typography>

                    {/* Image Carousel */}
                    {car.images && car.images.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: 3 }}>
                            {/* Previous Button */}
                            <IconButton
                                onClick={prevImage}
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    zIndex: 1,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    },
                                }}
                                color="primary"
                            >
                                <ArrowBack fontSize="large" />
                            </IconButton>

                            {/* Image Display - Increased size */}
                            <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <CardMedia
                                    component="img"
                                    alt={`Car Image ${currentImageIndex + 1}`}
                                    height="200"
                                    width="300"
                                    image={baseUrl + car.images[currentImageIndex].replace(/\\/g, '/')}
                                    title={`Car Image ${currentImageIndex + 1}`}
                                    sx={{
                                        objectFit: 'cover',
                                        borderRadius: 2,
                                        boxShadow: 2,
                                    }}
                                />
                            </Card>

                            {/* Next Button */}
                            <IconButton
                                onClick={nextImage}
                                sx={{
                                    position: 'absolute',
                                    right: 0,
                                    zIndex: 1,
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    },
                                }}
                                color="primary"
                            >
                                <ArrowForward fontSize="large" />
                            </IconButton>
                        </Box>
                    )}

                    {/* Buttons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                            sx={{
                                paddingX: 4,
                                paddingY: 2,
                                fontSize: '1rem',
                                borderRadius: 2,
                                boxShadow: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                    boxShadow: 4,
                                },
                            }}
                        >
                            Edit Car
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleDelete}
                            sx={{
                                paddingX: 4,
                                paddingY: 2,
                                fontSize: '1rem',
                                borderRadius: 2,
                                boxShadow: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: 'error.dark',
                                    boxShadow: 4,
                                },
                            }}
                        >
                            Delete Car
                        </Button>
                    </Box>
                </Paper>
            )}
        </Container>
    );
};

export default CarDetail;
