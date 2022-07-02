import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useContextSelector } from "../context";

export default function MultipleSelect({ bound }) {
  const { setUserRide, userRide } = useContextSelector();
  const [num, setNum] = React.useState("");

  const handleChange = (event) => {
    const val = event.target.value;
    setNum(val);
    setUserRide(() => ({ ...userRide, seats: val }));
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 60 }}>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={num}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value="" disabled>
            <em>seats</em>
          </MenuItem>
          {Array.from({ length: bound }, (_, i) => i + 1).map((num) => (
            <MenuItem key={num} value={num}>
              {num}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
