import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid } from '@mui/material';
import { createCar } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const CarForm = () => {
    const [formData, setFormData] = useState({ title: '', description: '', tags: '' });
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            alert("You can only upload a maximum of 10 images.");
        } else {
            setImages(files);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('tags', formData.tags);

        images.forEach((image) => {
            data.append('images', image); // Match field name expected in the backend
        });

        try {
            await createCar(data); // Pass FormData instead of JSON
            navigate('/cars', { state: { addedCar: true } }); // Navigate to CarList with state
        } catch (error) {
            console.error('Error creating car:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 5,
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <Typography variant="h4" gutterBottom>Add Car</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }} encType="multipart/form-data">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tags"
                                variant="outlined"
                                fullWidth
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Typography variant="body2" color="textSecondary">
                                (Upload up to 10 images)
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Add Car
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default CarForm;