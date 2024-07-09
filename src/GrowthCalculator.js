import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, FormControlLabel, Switch, Grid, Divider, IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function GrowthCalculator() {
  const [previousValue, setPreviousValue] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [growth, setGrowth] = useState(null);
  const [useQuarters, setUseQuarters] = useState(false);

  const [previousQ1, setPreviousQ1] = useState('');
  const [previousQ2, setPreviousQ2] = useState('');
  const [previousQ3, setPreviousQ3] = useState('');
  const [previousQ4, setPreviousQ4] = useState('');
  const [currentQ1, setCurrentQ1] = useState('');
  const [currentQ2, setCurrentQ2] = useState('');
  const [currentQ3, setCurrentQ3] = useState('');
  const [currentQ4, setCurrentQ4] = useState('');

  const [previousQuarters, setPreviousQuarters] = useState([]);
  const [currentQuarters, setCurrentQuarters] = useState([]);

  useEffect(() => {
    const getQuarters = () => {
      const currentDate = new Date();
    //   console.log(currentDate);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;


      let previousYear = currentYear - 1;
      let previousYearMinus1 = previousYear - 1;
      let previousQuarters, currentQuarters;

      if (currentMonth <= 3) {
        // Q4 of previous year is the last closed quarter
        previousQuarters = [`${previousYearMinus1} Q3`, `${previousYearMinus1} Q4`, `${previousYear} Q1`, `${previousYear} Q2`];
        currentQuarters = [`${previousYear} Q3`, `${previousYear} Q4`, `${currentYear} Q1`, `${currentYear} Q2`];
      } else if (currentMonth <= 6) {
        // Q1 is the last closed quarter
        previousQuarters = [`${previousYearMinus1} Q4`, `${previousYear} Q1`, `${previousYear} Q2`, `${previousYear} Q3`];
        currentQuarters = [`${previousYear} Q4`, `${currentYear} Q1`, `${currentYear} Q2`, `${currentYear} Q3`];
      } else if (currentMonth <= 9) {
        // Q2 is the last closed quarter
        previousQuarters = [`${previousYear} Q1`, `${previousYear} Q2`, `${previousYear} Q3`, `${previousYear} Q4`];
        currentQuarters = [`${currentYear} Q1`, `${currentYear} Q2`, `${currentYear} Q3`, `${currentYear} Q4`];
      } else {
        // Q3 is the last closed quarter
        previousQuarters = [`${previousYear} Q2`, `${previousYear} Q3`, `${previousYear} Q4`, `${currentYear} Q1`];
        currentQuarters = [`${currentYear} Q2`, `${currentYear} Q3`, `${currentYear} Q4`, `${currentYear + 1} Q1`];
      }

      if (currentMonth >= 7) {
        // We are in Q3 or later, so the last closed quarter is Q2
        previousQuarters = [`${previousYear} Q1`, `${previousYear} Q2`, `${previousYearMinus1} Q3`, `${previousYearMinus1} Q4`];
        currentQuarters = [`${currentYear} Q1`, `${currentYear} Q2`, `${previousYear} Q3`, `${previousYear} Q4`];
      } else if (currentMonth >= 4) {
        // We are in Q2 or later, so the last closed quarter is Q1
        previousQuarters = [`${previousYearMinus1} Q4`, `${previousYear} Q1`, `${previousYear} Q2`, `${previousYear} Q3`];
        currentQuarters = [`${previousYear} Q4`, `${currentYear} Q1`, `${currentYear} Q2`, `${currentYear} Q3`];
      } else if (currentMonth >= 1) {
        // We are in Q1, so the last closed quarter is Q4 of the previous year
        previousQuarters = [`${previousYear} Q3`, `${previousYear} Q4`, `${previousYearMinus1} Q1`, `${previousYearMinus1} Q2`];
        currentQuarters = [`${currentYear} Q1`, `${currentYear} Q2`, `${currentYear} Q3`, `${currentYear} Q4`];
      }



      setPreviousQuarters(previousQuarters);
      setCurrentQuarters(currentQuarters);
    };

    getQuarters();
  }, []);

  const calculateGrowth = () => {
    let pv = parseFloat(previousValue);
    let cv = parseFloat(currentValue);

    if (useQuarters) {
      pv = parseFloat(previousQ1) + parseFloat(previousQ2) + parseFloat(previousQ3) + parseFloat(previousQ4);
      cv = parseFloat(currentQ1) + parseFloat(currentQ2) + parseFloat(currentQ3) + parseFloat(currentQ4);
    }

    if (isNaN(pv) || isNaN(cv) || pv === 0) {
      setGrowth(null);
      return;
    }

    const result = ((cv - pv) / pv) * 100;
    setGrowth(result.toFixed(2));
  };

  const clearFields = () => {
    setPreviousValue('');
    setCurrentValue('');
    setPreviousQ1('');
    setPreviousQ2('');
    setPreviousQ3('');
    setPreviousQ4('');
    setCurrentQ1('');
    setCurrentQ2('');
    setCurrentQ3('');
    setCurrentQ4('');
    setGrowth(null);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Growth Calculator
      </Typography>
      <FormControlLabel
        control={<Switch checked={useQuarters} onChange={(e) => setUseQuarters(e.target.checked)} />}
        label="Use Quarters"
        sx={{ mb: 2 }}
      />
      <Tooltip
        title={
          <Box sx={{ textAlign: 'left', p: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              To calculate the growth using quarters, add the values of the four quarters for the previous and current periods:
            </Typography>
            <Typography variant="body2">
              <strong>Previous:</strong> {previousQuarters.join(', ')}
            </Typography>
            <Typography variant="body2">
              <strong>Current:</strong> {currentQuarters.join(', ')}
            </Typography>
          </Box>
        }
        arrow
      >
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
        {useQuarters ? (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label={`Previous ${previousQuarters[0]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={previousQ1}
                onChange={(e) => setPreviousQ1(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label={`Previous ${previousQuarters[1]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={previousQ2}
                onChange={(e) => setPreviousQ2(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={`Previous ${previousQuarters[2]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={previousQ3}
                onChange={(e) => setPreviousQ3(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label={`Previous ${previousQuarters[3]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={previousQ4}
                onChange={(e) => setPreviousQ4(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={`Current ${currentQuarters[0]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentQ1}
                onChange={(e) => setCurrentQ1(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label={`Current ${currentQuarters[1]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentQ2}
                onChange={(e) => setCurrentQ2(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label={`Current ${currentQuarters[2]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentQ3}
                onChange={(e) => setCurrentQ3(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
              <TextField
                label={`Current ${currentQuarters[3]}`}
                variant="outlined"
                fullWidth
                margin="normal"
                value={currentQ4}
                onChange={(e) => setCurrentQ4(e.target.value)}
                InputLabelProps={{ style: { color: '#B3B3B3' } }}
                InputProps={{
                  style: { color: 'white' },
                }}
              />
            </Grid>
          </Grid>
        ) : (
          <>
            <TextField
              label="Previous Value"
              variant="outlined"
              fullWidth
              margin="normal"
              value={previousValue}
              onChange={(e) => setPreviousValue(e.target.value)}
              InputLabelProps={{ style: { color: '#B3B3B3' } }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
            <TextField
              label="Current Value"
              variant="outlined"
              fullWidth
              margin="normal"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              InputLabelProps={{ style: { color: '#B3B3B3' } }}
              InputProps={{
                style: { color: 'white' },
              }}
            />
          </>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          onClick={calculateGrowth}
        >
          CALCULATE
        </Button>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
          onClick={clearFields}
        >
          CLEAR
        </Button>
      </Box>
      {growth !== null && (
        <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
          Growth Rate: {growth}%
        </Typography>
      )}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" component="h2">
        Formula Used
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        The formula for calculating the Growth Rate is:
      </Typography>
      <Typography variant="body2" sx={{ my: 2 }}>
        Growth Rate = ((Current Value - Previous Value) / Previous Value) * 100
      </Typography>
      <Typography variant="body1" sx={{ color: 'gray', fontStyle: 'italic', mt: 4 }}>
        Disclaimer: This calculator is for educational purposes only. Always verify results with a financial professional.
      </Typography>
    </Container>
  );
}

export default GrowthCalculator;
