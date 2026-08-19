import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export default function CouponSection() {
  const { t } = useTranslation();

  return (
    <Box
     sx={{
        display: "flex",
        alignItems: "center",
        columnGap: "24px",
    }}
    >
      <TextField
        placeholder={t("couponCode")}
        sx={{
           width: 300,
          "& .MuiOutlinedInput-root": {
            height: 56,
            borderRadius: "4px",
          }
        }}
      />

      <Button
        variant="contained"
        sx={{
              width: 210,
        height: 56,
        bgcolor: "#DB4444",
        textTransform: "none",
        borderRadius: "4px",
        boxShadow: "none",
        "&:hover": {
            bgcolor: "#C73838",
            boxShadow: "none",
        },
        }}
      >
        {t("applyCoupon")}
      </Button>
    </Box>
  );
}
