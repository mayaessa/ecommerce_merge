import {
  Box,
  Breadcrumbs,
  Container,
  Link,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import CartTable from "../../Components/CartTable";
import CouponSection from "../../Components/CouponSection";
import CartTotal from "../../Components/CartTotal";

export default function Cart() {
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 8,
        mb: 8,
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 6 }}>
        <Link underline="none" color="text.secondary">
          {t("home")}
        </Link>

        <Typography fontWeight={600}>
          {t("cart")}
        </Typography>
      </Breadcrumbs>

      {/* Cart Products */}
      <CartTable />

      {/* Coupon + Total */}
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 6,
          flexWrap: "wrap",
        }}
      >
        <CouponSection />

        <CartTotal />
      </Box>
    </Container>
  );
}