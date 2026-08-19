import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

import monitor from "../../public/assets/Side_Image.png";
import gamepad from "../../public/assets/Side_Image.png";


const items = [
  {
    id: 1,
    image: monitor,
    name: "LCD Monitor",
    price: 650,
    qty: 1,
  },
  {
    id: 2,
    img: gamepad,
    name: "H1 Gamepad",
    price: 550,
    qty: 2,
  },
];

export default function CartTable() {
  const { t } = useTranslation();

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
                sx={{
            width: "100%",
            maxWidth: "1150px",
            mx: "auto",
            boxShadow: "0 5px 20px rgba(0,0,0,.06)",
            borderRadius: 2,
        }}
      >
        <Table 
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 12px",
                "& td": {
                borderBottom: "12px solid #F5F5F5",
              },
          }}
        >
          <TableHead>
            <TableRow>

              <TableCell sx={header}>{t("product")}</TableCell>

              <TableCell sx={header}>{t("price")}</TableCell>

              <TableCell sx={header}>{t("quantity")}</TableCell>

              <TableCell sx={header} align="right">
                {t("subtotal")}
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {items.map((item) => (

              <TableRow key={item.id}>

                <TableCell sx={body}>

                  <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                  >
                    <Box
                      sx={{
                        position: "relative",
                       width: 45,
                       height: 45,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                        }}
                      />

                      <IconButton
                        size="small"
                        sx={{
                          position: "absolute",
                          top: -8,
                          left: -8,
                          bgcolor: "#DB4444",
                          color: "#fff",
                          width: 18,
                          height: 18,
                        }}
                      >
                        <CloseIcon sx={{ fontSize: 13 }} />
                      </IconButton>
                    </Box>

                    <Typography>{item.name}</Typography>
                  </Box>

                </TableCell>

                <TableCell sx={body}>
                  ${item.price}
                </TableCell>

                <TableCell sx={body}>

                  <Select
                    value={item.qty}
                    size="small"
                    sx={{
                      width: 80,
                    }}
                  >
                    {[1,2,3,4,5].map((n)=>(
                      <MenuItem value={n} key={n}>
                        {String(n).padStart(2,"0")}
                      </MenuItem>
                    ))}
                  </Select>

                </TableCell>

                <TableCell
                  sx={body}
                  align="right"
                >
                  ${item.price*item.qty}
                </TableCell>

              </TableRow>

            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Box
            sx={{
            width: "100%",
            maxWidth: "1150px",
            mx: "auto",
            mt: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}
      >
        <Button sx={button}>
          {t("returnToShop")}
        </Button>

        <Button sx={button}>
          {t("updateCart")}
        </Button>
      </Box>
    </>
  );
}

const header={
    py:3,
    fontWeight:500,
    fontSize:16
}

const body={
    py:2
}

const button={
    border:"1px solid #999",
    px:5,
    py:1.8,
    color:"#000",
    textTransform:"none",
    borderRadius:"4px"
}
