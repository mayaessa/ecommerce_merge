import {
  Box,
  Card,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import { useTranslation } from "react-i18next";

export default function ProductCard({
  image,
  title,
  price,
  oldPrice,
  discount,
  rating = 5,
  reviews = 65,
}) {
  const { t } = useTranslation();

  return (
    <Card
      elevation={0}
      sx={{
        width: 220,
        borderRadius: 2,
        overflow: "hidden",
        cursor: "pointer",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,.08)",
        },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          position: "relative",
          bgcolor: "#F5F5F5",
          height: 220,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Discount */}
        {discount && (
          <Box
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              bgcolor: "#DB4444",
              color: "#fff",
              px: 1,
              py: 0.3,
              borderRadius: 1,
              fontSize: 12,
            }}
          >
            -{discount}%
          </Box>
        )}

        {/* Icons */}
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            size="small"
            aria-label={t("addToWishlist")}
            sx={{
              bgcolor: "#fff",
              width: 34,
              height: 34,

              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            aria-label={t("viewProduct")}
            sx={{
              bgcolor: "#fff",
              width: 34,
              height: 34,

              "&:hover": {
                bgcolor: "#fff",
              },
            }}
          >
            <VisibilityOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          component="img"
          src={image}
          alt={title || t("product")}
          sx={{
            width: 150,
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Info */}
      <CardContent
        sx={{
          p: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: 16,
            mb: 1,
          }}
        >
          {title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              color: "#DB4444",
              fontWeight: 600,
            }}
          >
            ${price}
          </Typography>

          {oldPrice && (
            <Typography
              sx={{
                color: "#999",
                textDecoration: "line-through",
                fontSize: 14,
              }}
            >
              ${oldPrice}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            size="small"
          />

          <Typography
            sx={{
              color: "#777",
              fontSize: 14,
            }}
          >
            ({reviews})
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}