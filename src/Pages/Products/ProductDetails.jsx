import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { callApiGet } from "../../services/http";

import {
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import ProductGallery from "../../Components/ProductGallery";
import ProductInfo from "../../Components/ProductInfo";
import RelatedProducts from "../../Components/RelatedProducts.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function getProduct() {
      const response = await callApiGet(
        `product/${id}`,
        (err) => err.message || t("error")
      );

      if (response) {
        setProduct(response.data);
      }
    }

    getProduct();
  }, [id, t]);

  if (!product) {
    return (
      <Typography sx={{ p: 5 }}>
        {t("loading")}
      </Typography>
    );
  }

  const sizes = [
    ...new Set(
      (product.attributes || [])
        .filter((item) => item.name === "size")
        .map((item) => item.value)
    ),
  ];

  const colors = [
    ...new Set(
      (product.attributes || [])
        .filter((item) => item.name === "color")
        .map((item) => item.value)
    ),
  ];

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 8,
      }}
    >

      <Breadcrumbs sx={{ mb: 7 }}>

        <Link underline="hover" color="inherit">
          {t("account")}
        </Link>

        <Link underline="hover" color="inherit">
          {t("gaming")}
        </Link>

        <Typography color="text.primary">
          {product.name}
        </Typography>

      </Breadcrumbs>

      <Container maxWidth="lg" sx={{ mt: 8 }}>

        <Grid container spacing={6}>

          <Grid size={{ xs: 12, md: 7 }}>
            <ProductGallery
              heroImage={product.hero_image}
              media={product.media}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <ProductInfo
              price={product.price}
              name={product.name}
              rating={Number(product.reviews)}
              reviews={product.reviews_count}
              description={product.description}
              sizes={sizes}
              colors={colors}
            />
          </Grid>

        </Grid>

      </Container>

      <RelatedProducts />

    </Container>
  );
}