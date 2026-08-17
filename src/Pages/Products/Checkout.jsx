import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import BillingForm from "../../Components/BillingForm";
import OrderSummary from "../../Components/OrderSummary";

export default function Checkout() {
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
      }}
    >

      <Breadcrumbs sx={{ mb: 6 }}>

        <Link underline="hover" color="inherit">
          {t("account")}
        </Link>

        <Link underline="hover" color="inherit">
          {t("myAccount")}
        </Link>

        <Link underline="hover" color="inherit">
          {t("product")}
        </Link>

        <Link underline="hover" color="inherit">
          {t("viewCart")}
        </Link>

        <Typography fontWeight={600}>
          {t("checkout")}
        </Typography>

      </Breadcrumbs>

      <Grid container spacing={10}>

        <Grid item xs={12} md={6}>
          <BillingForm />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            mt: { md: 10 },
          }}
        >
          <OrderSummary />
        </Grid>

      </Grid>

    </Container>
  );
}