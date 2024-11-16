import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../api/api';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signUp(formData); // Assuming signUp is a function that handles signup
            navigate('/login'); // Redirect to login page upon successful signup
        } catch (error) {
            if (error.response && error.response.status === 500) { // Check for "user already exists" error
                setError('User already exists. Please login instead.');
            } else {
                setError('Signup failed. Please try again.');
            }
            console.error("Signup failed:", error); // Handle any errors that might occur
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
                    backgroundColor: 'white'
                }}
            >
                <Typography variant="h4" gutterBottom>Signup</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                fullWidth
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                error={!!error} // Show red border if there's an error
                                helperText={error} // Display error message below the field
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Signup
                            </Button>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="body2">
                                Already have an account?{' '}
                                <Link href="/login" color="primary">
                                    Login
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            {/* Container to display user details for check  */}
            <Box
                sx={{
                    marginTop: 5,
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: 'lightgray',
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6" gutterBottom>Details</Typography>
                <Typography variant="body1"><strong>Username:</strong> vaishali</Typography>
                <Typography variant="body1"><strong>Email:</strong> vaishali123@gmail.com</Typography>
                <Typography variant="body1"><strong>Password:</strong> vai123@</Typography>
            
                {/* Note to guide user */}
                <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
                    Note: To check the functionality, please go to the login page and log in with the existing details.
                </Typography>
            </Box>
        </Container>
    );
};

export default Signup;
