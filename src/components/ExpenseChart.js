import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { getExpensesByMonthYear } from "../utils/idb";
import { Box, Typography } from "@mui/material";
import '../styles/styles.css';


export const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6363", "#A28BFE"];

const ExpenseChart = ({ month, year }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpensesByMonthYear(month, year);
            const categoryTotals = expenses.reduce((acc, exp) => {
                acc[exp.category] = (acc[exp.category] || 0) + exp.sum;
                return acc;
            }, {});

            const data = Object.keys(categoryTotals).map((key, index) => ({
                name: key,
                value: categoryTotals[key],
                color: COLORS[index % COLORS.length],
            }));

            setChartData(data);
        };

        fetchExpenses();
    }, [month, year]);

    return (
        <Box textAlign="center">
            <Typography variant="h5" align="center">Expense Distribution</Typography>
            {chartData.length > 0 ? (
                <PieChart width={400} height={400}>
                    <Pie data={chartData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ) : (
                <Typography>No expenses recorded for this period</Typography>
            )}
        </Box>
    );
};

export default ExpenseChart;
