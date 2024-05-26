import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, Link, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { register } from '../utils';
import './Signup.css'


export default function Signup (){
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      register(formData)
        .then(() => {
          setSuccess('Registration successful!');
          setErrorMessage('');
        })
        .catch((error) => {
          setSuccess('');
          setErrorMessage(error.message);
        });
    } else {
      setErrors(validationErrors);
      setSuccess('');
      setErrorMessage('');
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh" bg="gray.50">
      <Box className="signup-container" >
        <Text fontSize="20" mb="5" textAlign="center">Sign Up</Text>
        <form onSubmit={handleSubmit}>
          <Stack spacing="5">
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <Text color="red.500" fontSize="sm">{errors.email}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <Text color="red.500" fontSize="sm">{errors.password}</Text>}
            </FormControl>
            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <Text color="red.500" fontSize="sm">{errors.confirmPassword}</Text>}
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md">Sign Up</Button>
          </Stack>
        </form>
        {success && (
          <Alert status="success" mt="4">
            <AlertIcon />
            {success}
          </Alert>
        )}
        {errorMessage && (
          <Alert status="error" mt="4">
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}
        <Text mt="4" textAlign="center">
          Already have an account? <Link color="teal.500" href="#">Log in</Link>
        </Text>
      </Box>
    </Flex>
  );
};

