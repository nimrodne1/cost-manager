import React, { useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { Container, Typography } from "@mui/material";
import '../styles/styles.css';


const AddExpense = () => {
    const [refresh, setRefresh] = useState(false);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center" >
                Add Expense
            </Typography>
            <ExpenseForm onExpenseAdded={() => setRefresh(!refresh)} />
            <ExpenseList month={new Date().getMonth() + 1} year={new Date().getFullYear()} refresh={refresh} />
        </Container>
    );
};

export default AddExpense;
