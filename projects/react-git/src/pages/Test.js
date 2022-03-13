import { React, useState } from "react";
import { ChromePicker, SketchPicker, TwitterPicker } from "react-color";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Clock from "../components/Clock";

import DeleteIcon from "@mui/icons-material/Delete";

export default function Test() {
  let [state, setState] = useState({
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
  });

  // const handleClick = () => {
  //   setState({ displayColorPicker: !this.state.displayColorPicker });
  // };

  // const handleClose = () => {
  //   setState({ displayColorPicker: false });
  // };

  const handleChange = (color) => {
    setState({ color: color.rgb });
  };

  return (
    <Box>
      <Box sx={{ marginBottom: 1 }}>
        <Typography variant="h3" color="primary" align="center" gutterBottom>
          Test page
        </Typography>
        <Typography
          color="secondary"
          // noWrap
        >
          Hey gang, in this Material UI tutorial
        </Typography>
      </Box>
      <ButtonGroup
        size="small"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" children="primary" />
        <Button variant="contained" color="secondary" children="secondary" />
        <Button variant="contained" color="success" children="success" />
        <Button variant="contained" color="error" children="error" />
        <Button variant="contained" color="info" children="info" />
        <Button variant="contained" color="warning" children="warning" />
      </ButtonGroup>
      <ButtonGroup
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" children="contained" />

        <Button variant="outlined" color="secondary" children="outlined" />

        <Button
          variant="contained"
          color="success"
          startIcon={<DeleteIcon />}
          children="with icon"
        />

        <Button
          onClick={() => console.log("hi")}
          // variant="text"
          color="error"
          children="text"
        />
      </ButtonGroup>
      <Typography variant="body2" color="secondary" children={<Clock />} />

      <Box sx={{ display: "flex", marginBottom: 1 }}>
        ChromePicker
        <ChromePicker color={state.color} onChange={handleChange} />
        SketchPicker
        <SketchPicker color={state.color} onChange={handleChange} />
        TwitterPicker
        <TwitterPicker color={state.color} onChange={handleChange} />
      </Box>
    </Box>
  );
}
