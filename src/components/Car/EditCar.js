import React, { useEffect, useState } from 'react';
import { getCarById, updateCar } from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, TextField, Grid, Card, CardMedia } from '@mui/material';

const EditCar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { data } = await getCarById(id);
                setCar(data);
                setTitle(data.title);
                setDescription(data.description);
                setImages(data.images || []);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };
        fetchCar();
    }, [id]);

    const handleImageChange = (event) => {
        setSelectedImages([...event.target.files]);
    };

    const handleSave = async () => {
        try {
            const updatedCar = {
                title,
                description,
                images: selectedImages, // Send the new images as a list of file objects
            };
            await updateCar(id, updatedCar);
            navigate(`/cars/${id}`); // Redirect to car detail page after update
        } catch (error) {
            console.error('Error updating car details:', error);
        }
    };

    const handleCancel = () => {
        navigate(`/cars/${id}`); // Redirect to car detail page without saving
    };

    return (
        <Container maxWidth="sm">
            {car && (
                <Box
                    sx={{
                        marginTop: 5,
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white',
                    }}
                >
                    <Typography variant="h4" gutterBottom>Edit Car</Typography>

                    {/* Title and Description Fields */}
                    <TextField
                        label="Car Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Car Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Display Car Images */}
                    {images && images.length > 0 && (
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h6">Current Car Images</Typography>
                            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                                {images.map((image, index) => {
                                    const imageUrl = `http://localhost:5000/${image.replace(/\\/g, '/')}`;
                                    return (
                                        <Grid item key={index} xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    alt={`Car Image ${index + 1}`}
                                                    height="200"
                                                    image={imageUrl}
                                                    title={`Car Image ${index + 1}`}
                                                />
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    )}

                    {/* Image Upload */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h6">Upload New Images (Optional)</Typography>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            sx={{ marginBottom: 2 }}
                        />
                    </Box>

                    {/* Action Buttons */}
                    <Box sx={{ marginTop: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            sx={{ marginRight: 2 }}
                        >
                            Save Changes
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default EditCar;
