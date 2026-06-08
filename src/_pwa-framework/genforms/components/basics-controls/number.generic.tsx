import { Grid, InputAdornment, TextField } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useFormikContext } from "formik";
import { useLanguage } from "@/_pwa-framework/hooks/use-language";

export const BasicNumberFields = ({
  id,
  gridSx,
  initialValue,
  gridValues,
  name,
  label,
  color,
  disabled,
  hidden,
  focused,
  placeholder,
  sx,
  onChange,
  validations,
  disabledOnEdit,
  editMode,
  persist,
  decimalScale = 2,
  prefix = "",
  allowNegative = false,
}: any) => {
  const { t } = useLanguage();
  const { setFieldValue, setFieldTouched, values, touched, errors } =
    useFormikContext();

  const error = (touched as any)[name] && (errors as any)[name];
  const value = (values as any)[name] ?? "";

  const handleChange = useCallback(
    (e: any) => {
      let val = e.target.value;

      // Quitamos el prefijo si lo tiene visualmente
      if (prefix && val.startsWith(prefix)) {
        val = val.slice(prefix.length);
      }

      // Validación básica
      if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
        // Limitamos los decimales si es necesario
        const [intPart, decimalPart] = val.split(".");
        if (
          !decimalPart ||
          (decimalScale === 0 && !val.includes(".")) ||
          (decimalPart.length <= decimalScale && decimalScale > 0)
        ) {
          setFieldValue(name, val);
          setFieldTouched(name);
          onChange?.({ ...e, value: val });
        }
      }
    },
    [decimalScale, prefix, setFieldValue, setFieldTouched]
  );

  useEffect(() => {
    setFieldValue(name, initialValue ?? "", false);
  }, [initialValue]);

  useEffect(() => {
    const valueRef = typeof value === "object" ? JSON.stringify(value) : value;
    if (hidden?.(values) && !persist) {
      setFieldValue(name, initialValue ?? "", false);
    }
  }, [value]);

  const handleKeyDown = (e: any) => {
    const allowedKeys = [
      "Backspace",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Home",
      "End",
    ];

    if (allowedKeys.includes(e.key)) return;

    const isNumber = /^[0-9]$/.test(e.key);
    const isDot = e.key === ".";
    const isNegative = e.key === "-";

    if (isNumber) return;

    if (isDot && decimalScale > 0 && !e.currentTarget.value.includes(".")) {
      return;
    }

    if (
      isNegative &&
      allowNegative &&
      !e.currentTarget.value.includes("-") &&
      e.currentTarget.selectionStart === 0
    ) {
      return;
    }

    e.preventDefault();
  };

  return (
    <Grid
      item
      display={hidden?.(values) ? "none" : "unset"}
      xs={gridValues?.xs}
      sm={gridValues?.sm}
      md={gridValues?.md}
      lg={gridValues?.lg}
      xl={gridValues?.xl}
      sx={gridSx}
    >
      <TextField
        fullWidth
        id={id ?? name}
        name={name}
        label={
          <label>
            {t(label)}
            {validations?.required && <b style={{ color: "red" }}> * </b>}
          </label>
        }
        color={color}
        focused={focused}
        placeholder={t(placeholder)}
        disabled={(editMode && disabledOnEdit) || disabled?.(values)}
        sx={sx}
        value={`${prefix}${value}`}
        error={!!error}
        helperText={error}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        InputProps={{
          startAdornment: prefix && (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ),
        }}
        variant="outlined"
      />
    </Grid>
  );
};
