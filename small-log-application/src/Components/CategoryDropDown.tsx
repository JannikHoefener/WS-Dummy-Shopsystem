import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";

/**
 * props type für das CategoryDropDown um die entsprechende Werte an Formik übergeben zu können.
 * Die Übergabe wird in AddProductForm gemacht
 */
type CategoryDropDownProps = {
  categories: string[];
  onChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  lable: string;
  value: string;
  error: boolean | undefined;
  helperText: React.ReactNode;
  required: boolean | undefined;
};

/**
 *the products categories as Dropdown
 * @param props
 * @returns
 */
export default function CategoryDropDown(props: CategoryDropDownProps) {
  return (
    <FormControl error={props.error}>
      <InputLabel required={props.required}>{props.lable}</InputLabel>
      <Select
        sx={{ width: 230 }}
        value={props.value}
        onChange={props.onChange}
        name="category"
        label={props.lable}
        error={props.error}
      >
        {props.categories.map((category, index) => (
          <MenuItem value={category} key={category}>
            {category.toUpperCase()}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
}
