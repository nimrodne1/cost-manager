import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteExpense, getExpensesByMonthYear} from "../utils/idb";
import { COLORS } from "./ExpenseChart";
import '../styles/styles.css';


const ExpenseList = ({ month, year, refresh }) => {
    const [expenses, setExpenses] = useState([]);
    const [categoryColors, setCategoryColors] = useState({});

    useEffect(() => {
        const fetchExpenses = async () => {
            const data = await getExpensesByMonthYear(month, year);

            // יצירת אובייקט שבו לכל קטגוריה יש צבע ייחודי
            const categoryTotals = data.reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.sum;
                return acc;
            }, {});

            const colorMapping = Object.keys(categoryTotals).reduce((acc, category, index) => {
                acc[category] = COLORS[index % COLORS.length];
                return acc;
            }, {});

            setCategoryColors(colorMapping);
            setExpenses(data);
        };

        fetchExpenses();
    }, [month, year, refresh]);

    const handleDelete = async (id) => {
        await deleteExpense(id);
        setExpenses(expenses.filter((exp) => exp.id !== id));
    };

    return (
        <List>
            {expenses.map((expense) => (
                <ListItem key={expense.id} secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(expense.id)}>
                        <DeleteIcon />
                    </IconButton>
                }>
                    <ListItemText
                        primary={
                            <span style={{ color: categoryColors[expense.category] }}>
                                {`${expense.category}: $${expense.sum}`}
                            </span>
                        }
                        secondary={expense.description}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ExpenseList;
