import React from "react";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { Container, AppBar, Toolbar, Button,Typography } from "@mui/material";
import HomePage from "./pages/HomePage";
import AddExpense from "./pages/AddExpense";
import Reports from "./pages/Reports";

const App = () => {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/add">Add Expense</Button>
                        <Button color="inherit" component={Link} to="/reports">Reports</Button>
                    </div>
                    <Typography variant="h6" color="inherit">
                        Cost Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<AddExpense />} />
                    <Route path="/reports" element={<Reports />} />
                </Routes>
            </Container>
        </Router>
    );
};

export default App;