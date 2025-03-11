import React from "react";
import { Container, Typography } from "@mui/material";
import '../styles/styles.css';

const HomePage = () => {
    return (
        <Container className="container">
            <Typography variant="h3" gutterBottom align="center">
                Welcome to the Cost Manager!
            </Typography>

            <Typography variant="h6" paragraph align="center">
                Easily track and manage your expenses by adding new items and generating reports.
            </Typography>
        </Container>
    );
};

export default HomePage;
