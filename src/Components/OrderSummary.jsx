import {
  Box,
  Button,
  Divider,
  Radio,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import monitor from "../../public/assets/Side_Image.png";
import gamepad from "../../public/assets/Side_Image.png";

const items = [
  {
    image: monitor,
    name: "LCD Monitor",
    total: "$650",
  },
  {
    image: gamepad,
    name: "H1 Gamepad",
    total: "$1100",
  },
];

export default function OrderSummary() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 430,
        ml: "auto",
      }}
    >
      <Stack spacing={3}>
        {items.map((item) => (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <img
                src={item.image}
                width={50}
                alt={item.name}
              />

              <Typography fontSize={15}>
                {item.name}
              </Typography>
            </Box>

            <Typography fontSize={15}>
              {item.total}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Box mt={4}>
        <Row
          title={t("subtotal")}
          value="$1750"
        />

        <Divider sx={{ my: 1.5 }} />

        <Row
          title={t("shipping")}
          value={t("free")}
        />

        <Divider sx={{ my: 1.5 }} />

        <Row
          title={t("total")}
          value="$1750"
        />
      </Box>

      {/* Payment */}
      <Box sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Radio
              size="small"
              checked
            />

            <Typography>
              {t("bank")}
            </Typography>
          </Box>

          <img
            src="/assets/payment.png"
            height={24}
            alt={t("paymentMethods")}
          />
        </Box>

        <Box
          display="flex"
          alignItems="center"
          mt={2}
        >
          <Radio />

          <Typography>
            {t("cashOnDelivery")}
          </Typography>
        </Box>
      </Box>

      {/* Coupon */}
      <Box
        display="flex"
        gap={2}
        mt={4}
      >
        <TextField
          placeholder={t("couponCode")}
          size="small"
          sx={{ flex: 1 }}
        />

        <Button
          variant="contained"
          sx={{
            bgcolor: "#DB4444",
            px: 4,
            textTransform: "none",
          }}
        >
          {t("applyCoupon")}
        </Button>
      </Box>

      {/* Place Order */}
      <Button
        variant="contained"
        sx={{
          mt: 4,
          width: 170,
          height: 50,
          bgcolor: "#DB4444",
          textTransform: "none",
          boxShadow: "none",

          "&:hover": {
            bgcolor: "#C73B3B",
          },
        }}
      >
        {t("placeOrder")}
      </Button>
    </Box>
  );
}

function Row({ title, value }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5,
      }}
    >
      <Typography fontSize={15}>
        {title}
      </Typography>

      <Typography
        fontSize={15}
        fontWeight={500}
      >
        {value}
      </Typography>
    </Box>
  );
}