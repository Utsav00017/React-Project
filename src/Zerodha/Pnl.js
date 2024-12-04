import React, { useState, useEffect } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { Table, Button, Modal } from "react-bootstrap";
import { DataGrid } from '@mui/x-data-grid';


const Pnl = ({ trades }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTrades, setSelectedTrades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("trades ::" + JSON.stringify(trades));

   // Load stored dates from localStorage if they exist
   useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(storedStartDate);
    }

    if (storedEndDate) {
      setEndDate(storedEndDate);
    }
  }, []);

  // Save dates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [startDate, endDate]);

  // Function to filter trades based on the date range or specific date
  const filterTrades = () => {
    if (selectedDate) {
      return trades.filter((trade) => trade.date === selectedDate);
    }
    return trades.filter(
      (trade) =>
        new Date(trade.date) >= new Date(startDate) &&
        new Date(trade.date) <= new Date(endDate)
    );
  };


  // Function to calculate total PnL
  const calculateTotalPnL = (tradesToShow) => {
    return tradesToShow.reduce((total, trade) => total + trade.pnl, 0).toFixed(2);
  };

  // Handle date clicks in the heatmap
  const handleClick = (value) => {
    if (value && value.date) {
      setSelectedDate(value.date); // Set the selected date
      const tradesForDate = trades.filter((trade) => trade.date === value.date);
      setSelectedTrades(tradesForDate);
      setIsModalOpen(true);
    } else {
      // Reset to showing all trades within the date range
      setSelectedDate(null);
      setSelectedTrades([]);
    }
  };

  // Function to aggregate PnL by date
  const aggregatePnLByDate = (trades) => {
    const datePnLAggregates = {};

    trades.forEach((trade) => {
      if (!datePnLAggregates[trade.date]) {
        datePnLAggregates[trade.date] = 0;
      }
      datePnLAggregates[trade.date] += trade.pnl;
    });

    // Convert aggregated data back to array format for CalendarHeatmap
    return Object.keys(datePnLAggregates).map((date) => ({
      date,
      count: parseFloat(datePnLAggregates[date].toFixed(2)),
    }));
  };

  // Map the aggregated PnL data
  const values = aggregatePnLByDate(trades);

  // Function to generate months between the start and end date
  const generateMonths = (start, end) => {
    const months = [];
    const current = new Date(start);
    while (current <= end) {
      months.push(new Date(current.getFullYear(), current.getMonth(), 1));
      current.setMonth(current.getMonth() + 1);
    }
    return months;
  };

  // Group values by month
  const groupValuesByMonth = (values) => {
    const months = generateMonths(new Date(startDate), new Date(endDate));
    return months.map((month) => {
      const monthStart = new Date(month);
      monthStart.setHours(0, 0, 0, 0); // Set the time to the start of the month

      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      monthEnd.setHours(23, 59, 59, 999); // Set the time to the end of the month

      const monthValues = values.filter((value) => {
        const valueDate = new Date(value.date);
        return valueDate >= monthStart && valueDate <= monthEnd;
      });

      return {
        monthLabel: month.toLocaleString("default", { month: "long", year: "numeric" }),
        startDate: monthStart,
        endDate: monthEnd,
        values: monthValues,
      };
    });
  };

  // Generate the months and group values accordingly
  const groupedMonths = groupValuesByMonth(values);

  // Limit to the last 12 months
  const limitedMonths = groupedMonths.slice(-12);

  const columns = [
    { field: 'id', headerName: 'Id', width: 70 },
    { field: 'symbol', headerName: 'Symbol', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'lot', headerName: 'Lot size', width: 130 },
    { field: 'entry', headerName: 'Entry', width: 130 },
    { field: 'exit', headerName: 'Exit', width: 130 },
    {
      field: 'opentime',
      headerName: 'Open date',
      width: 130,
      renderCell: (params) => {
        // Simply return empty string for total row
        if (params.row.id === 'Total') {
          return '';
        }
        // Otherwise, format the date as usual
        return new Date(params.value).toLocaleDateString('en-IN');
      }
    },
    {
      field: 'date',
      headerName: 'Close date',
      width: 130,
      renderCell: (params) => {
        // Simply return empty string for total row
        if (params.row.id === 'Total') {
          return '';
        }
        // Otherwise, format the date as usual
        return new Date(params.value).toLocaleDateString('en-IN');
      }
    },
    { field: 'Reason', headerName: 'Reason', width: 130 },
    {
      field: 'pnl',
      headerName: 'P/L',
      width: 90,
      renderCell: (params) => {
        const pnl = params.value;
        const color = pnl < 0 ? 'red' : 'green';  
        return (
          <span style={{ color: color }}>
            {parseFloat(pnl).toFixed(2)} $
          </span>
        );
      }
    }
  ];
  
  

  const totalPnl = filterTrades().reduce((sum, row) => sum + row.pnl, 0);

  const totalRow = {
    id: 'Total',
    pnl: totalPnl.toFixed(2),
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Start Date:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "20px" }}>
          End Date:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Heatmap display (this part stays unchanged as you requested) */}
      <div className="heatmap-container">
        {limitedMonths.map(({ monthLabel, startDate, endDate, values }) => {
          const adjustedStartDate = startDate.toISOString().split("T")[0];
          const adjustedEndDate = endDate.toISOString().split("T")[0];
          return (
            <div key={monthLabel} className="heatmap-month">
              <h4 className="month-label">{monthLabel}</h4>
              <CalendarHeatmap
                startDate={adjustedStartDate}
                endDate={adjustedEndDate}
                values={values}
                classForValue={(value) => {
                  if (!value) return "color-empty"; // Empty cells
                  if (value.count > 0) {
                    // Profit (Green)
                    if (value.count <= 5) return "color-green-light";
                    if (value.count <= 10) return "color-green-medium";
                    return "color-green-dark";
                  } else {
                    // Loss (Red)
                    if (value.count >= -5) return "color-red-light";
                    if (value.count >= -10) return "color-red-medium";
                    return "color-red-dark";
                  }
                }}
                tooltipDataAttrs={(value) => {
                  if (!value || !value.date) return null;
                  return {
                    "data-tooltip-id": "heatmap-tooltip",
                    "data-tooltip-content": `Date: ${new Date(value.date).toLocaleDateString('en-IN')}, PnL: ${value.count}`,
                  };
                }}
                onClick={handleClick}
              />
            </div>
          );
        })}
      </div>

      <Tooltip id="heatmap-tooltip" />

      {/* Table */}
      {/* <Table striped bordered hover variant="light" className="mt-3" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Type</th>
            <th>Lot size</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Open</th>
            <th>Close</th>
            <th>Reason</th>
            <th>PnL</th>
          </tr>
        </thead>
        <tbody>
          {

            filterTrades().length === 0 ?

              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}> Data not available</td>
              </tr>
              :
              filterTrades().map((trade, index) => (
                <tr key={index}>
                  <td>{trade.symbol}</td>
                  <td>{trade.type}</td>
                  <td>{trade.lot}</td>
                  <td>{trade.entry}</td>
                  <td>{trade.exit}</td>
                  <td>{trade.opentime}</td>
                  <td>{new Date(trade.date).toLocaleDateString('en-IN')}</td>
                  <td>{trade.Reason}</td>
                  <td
                    style={{
                      color: trade.pnl < 0 ? "#ff0000" : "green", 
                    }}
                  >{trade.pnl + " $"}</td>
                </tr>
              ))}
          <tr>
            <td colSpan="8" style={{ textAlign: "right" }}>
              <strong>Total PnL</strong>
            </td>
            <td style={{
                      color: calculateTotalPnL(filterTrades()) < 0 ? "#ff0000" : "green"
                    }}> 
              {calculateTotalPnL(filterTrades()) + " $"}</td>
          </tr>
        </tbody>
      </Table> */}

      <DataGrid
        rows={[...filterTrades(), totalRow]}
        columns={columns}
        pageSize={filterTrades().length + 1}
        sx={{ border: 0 }}
      />

      {/* Modal for detailed trades */}
      {/* <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Trades for {selectedDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrades.length > 0 ? (
            <Table striped bordered hover variant="light" className="mt-3">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Type</th>
                  <th>Lot size</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>Open</th>
                  <th>Close</th>
                  <th>Reason</th>
                  <th>PnL</th>
                </tr>
              </thead>
              <tbody>
                {selectedTrades.map((trade, index) => (
                  <tr key={index}>
                    <td>{trade.symbol}</td>
                    <td>{trade.type}</td>
                    <td>{trade.lot}</td>
                    <td>{trade.entry}</td>
                    <td>{trade.exit}</td>
                    <td>{trade.opentime}</td>
                    <td>{trade.date}</td>
                    <td>{trade.Reason}</td>
                    <td>{trade.pnl}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No trades for this date.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Pnl;
