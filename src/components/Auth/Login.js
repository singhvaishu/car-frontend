import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/api';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await login(formData);
            // Save token to localStorage
            localStorage.setItem('authToken', data.token);
            navigate('/cars'); // Redirect to the cars page upon successful login
        } catch (error) {
            if (error.response && error.response.status === 400) { // Check for "user not found" error
                setError('User not found. Please sign up first.');
            } else if (error.response && error.response.status === 401) { // Invalid credentials
                setError('Invalid username or password.');
            } else {
                setError('Login failed. Please try again.');
            }

            console.error("Login failed:", error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 5, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: 'white' }}>
                <Typography variant="h4" gutterBottom>Login</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                            <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Typography variant="body2">
                                Don't have an account?{' '}
                                <Link href="/" color="primary">
                                    Sign Up
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
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
                    <Typography variant="body1"><strong>Password:</strong> vai123@</Typography>
                    <Typography variant="body1"><strong>Email:</strong> vaishali123@gmail.com</Typography>
                    {/* Note to guide user */}
                    <Typography variant="body2" sx={{ marginTop: 2, color: 'gray' }}>
                        Note: plz login through above username , password and check all feature .
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
