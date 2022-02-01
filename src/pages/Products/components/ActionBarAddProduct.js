import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

export const ActionBarAddProduct = (props) => {
  let navigate = useNavigate();
  return (
    <Box {...props}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Новый продукт
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Импорт
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={(event) => {
              event.preventDefault();
              navigate("add");
            }}
          >
            Сохранить продукт
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ActionBarAddProduct;
