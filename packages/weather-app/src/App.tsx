import React, { useState } from "react";
import { Box, Button, FormHelperText, Input, Typography } from "@mui/material";
import axios from "axios";

import "./App.css";

const App: React.FunctionComponent = () => {
  const getWeatherAPI = async (q: string) => {
    const api = `http://${process.env.REACT_APP_API_BASE || "localhost:3000"}/api/v1/weather`;
    const res = await axios.get<{
      data: {
        location: string;
        tempCelcius: number;
        tempFarhenite: number;
      };
    }>(`${api}?q=${q}`);

    return res;
  };

  const [weather, setWeather] = React.useState<{
    isLoading: boolean;
    weather: {
      location: string;
      tempCelcius: number;
      tempFarhenite: number;
    } | null;
    error: null | string;
  }>({
    isLoading: false,
    weather: null,
    error: null,
  });

  const [inputQuery, setInputQuery] = useState("");

  const getWeather = async () => {
    if (inputQuery === "") {
      setWeather((prevState) => ({
        ...prevState,
        error: "Input cannot be empty!",
      }));

      return;
    }

    setWeather({
      error: null,
      isLoading: true,
      weather: null,
    });

    try {
      const res = await getWeatherAPI(inputQuery);

      setWeather({
        error: null,
        isLoading: false,
        weather: res.data.data,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setWeather({
        error: "Error Loading weather.",
        isLoading: false,
        weather: null,
      });
    }
  };

  return (
    <div className="App">
      <Box maxWidth={320} margin={"auto"}>
        <Box>
          {weather.weather && !weather.error ? (
            <>
              <Typography>
                Weather at {weather.weather.location} currently is{" "}
                {weather.weather.tempFarhenite}F
              </Typography>
            </>
          ) : (
            <Typography>Fetch Weather!</Typography>
          )}
        </Box>
        <Box flex={1} flexDirection={"column"} display={"flex"}>
          <Input
            sx={{
              my: 4,
            }}
            value={inputQuery}
            onChange={(e) => {
              e.preventDefault();
              setInputQuery(e.target.value);
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              getWeather();
            }}
          >
            Get Weather
          </Button>
          <FormHelperText error>{weather.error}</FormHelperText>
        </Box>
      </Box>
    </div>
  );
};

export default App;
