import React, { useState } from "react";
import { TextField, Button, MenuItem, Box } from "@mui/material";
import { addExpense } from "../utils/idb";
import '../styles/styles.css';


const categories = ["Food", "Transport", "Entertainment", "Other"];

const ExpenseForm = ({ onExpenseAdded }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!sum || !category || !description) return alert("Please fill all fields");

        const newExpense = {
            sum: parseFloat(sum),
            category,
            description,
            date: new Date().toISOString(),
        };

        await addExpense(newExpense);
        onExpenseAdded();
        setSum("");
        setCategory("");
        setDescription("");
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 400, margin: "auto" }}>
            <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <TextField label="Amount" type="number" value={sum} onChange={(e) => setSum(e.target.value)} required />
            <TextField select label="Category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                        {cat}
                    </MenuItem>
                ))}
            </TextField>
            <Button type="submit" variant="contained" color="primary">
                Add Expense
            </Button>
        </Box>
    );
};

export default ExpenseForm;
