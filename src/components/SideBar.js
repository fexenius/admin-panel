import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Drawer,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SchemaIcon from "@mui/icons-material/Schema";
import PercentIcon from "@mui/icons-material/Percent";
import CategoryIcon from "@mui/icons-material/Category";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { SideBarItem } from "./SideBarItem";

const items = [
  {
    href: "/",
    icon: <BarChartIcon fontSize="small" />,
    title: "Статистика",
  },
  {
    href: "/users",
    icon: <GroupIcon fontSize="small" />,
    title: "Пользователи",
  },
  {
    href: "/categories",
    icon: <CategoryIcon fontSize="small" />,
    title: "Категории",
  },
  {
    href: "/products",
    icon: <ShoppingCartIcon fontSize="small" />,
    title: "Продукты",
  },
  {
    href: "/attributes",
    icon: <SchemaIcon fontSize="small" />,
    title: "Характеристики",
  },
  {
    href: "/discounts",
    icon: <PercentIcon fontSize="small" />,
    title: "Скидки",
  },
  {
    href: "/delivery",
    icon: <LocalShippingIcon fontSize="small" />,
    title: "Доставка",
  },
  {
    href: "/settings",
    icon: <SettingsIcon fontSize="small" />,
    title: "Настройки",
  },
];

export const SideBar = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            p: 3,
            pb: 1,
          }}
        >
          <ShoppingBagIcon
            sx={{
              height: 42,
              width: 42,
            }}
          />
          <Typography
            component="span"
            sx={{ flexGrow: 1, ml: 1 }}
            color="inherit"
            variant="subtitle1"
          >
            Shop CMS
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <List
            onClick={() => {
              onClose();
            }}
          >
            {items.map((item) => (
              <SideBarItem
                key={item.title}
                icon={item.icon}
                href={item.href}
                title={item.title}
              />
            ))}
          </List>
        </Box>
        <Divider sx={{ borderColor: "#2D3748" }} />
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideBar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

export default SideBar;
