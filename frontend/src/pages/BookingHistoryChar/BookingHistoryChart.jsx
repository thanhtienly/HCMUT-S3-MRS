import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./BookingHistoryChart.module.scss";

const BookingHistoryChart = () => {
  const [allTimeData, setAllTimeData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Giả lập API
    const fetchAllTime = async () => {
      const data = [
        { quantity: 10, roomNumber: "H6-101" },
        { quantity: 4, roomNumber: "H6-102" },
        { quantity: 2, roomNumber: "H6-103" },
      ];
      setAllTimeData(data);
    };

    const fetchMonthly = async () => {
      const data = [
        { quantity: 2, roomNumber: "H6-101" },
        { quantity: 1, roomNumber: "H6-102" },
        { quantity: 1, roomNumber: "H6-103" },
      ];
      setMonthlyData(data);
    };

    fetchAllTime();
    fetchMonthly();
  }, []);

  const renderChart = (title, data, barColor, lineColor) => (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="roomNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill={barColor} />
          <Line type="monotone" dataKey="quantity" stroke={lineColor} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className={styles.wrapper}>
      {renderChart(
        "5 Phòng học được đặt nhiều nhất  ",
        allTimeData,
        "var(--primary)",
        "#FF6347"
      )}
      {renderChart(
        "5 Phòng học được đặt nhiều nhất (trong vòng 1 tháng)",
        monthlyData,
        "#9ADE7B",
        "#003366"
      )}
    </div>
  );
};

export default BookingHistoryChart;
