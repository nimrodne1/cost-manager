import React, { useState, useEffect } from "react";
import { Container, Typography, Select, MenuItem, Box, FormControl, InputLabel } from "@mui/material";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseList from "../components/ExpenseList";
import { getExpensesByMonthYear } from "../utils/idb";
import '../styles/styles.css';


// שמות החודשים
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Reports = () => {
    const currentMonth = new Date().getMonth(); // חודש נוכחי (אינדקס מ-0)
    const currentYear = new Date().getFullYear();

    const [month, setMonth] = useState(currentMonth);
    const [year, setYear] = useState(currentYear);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const result = await getExpensesByMonthYear(month + 1, year);  // month+1 כי ה-IndexedDB משתמש בחודש בין 1-12
            setExpenses(result);
        };
        fetchExpenses();
    }, [month, year]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom align="center">Expense Reports</Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="month-label">Month</InputLabel>
                    <Select
                        labelId="month-label"
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        label="Month"
                    >
                        {monthNames.map((monthName, index) => (
                            <MenuItem key={index} value={index}>{monthName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                        labelId="year-label"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        label="Year"
                    >
                        {[2020, 2021, 2022, 2023, 2024, 2025].map((y) => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Pie Chart - מיקום קודם */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <ExpenseChart month={month + 1} year={year} />
            </Box>

            {/* Expense List - מיקום אחרי תרשים העוגה */}
            <ExpenseList month={month + 1} year={year} expenses={expenses} />
        </Container>
    );
};

export default Reports;
