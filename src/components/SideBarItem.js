import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, ListItem, Divider } from "@mui/material";

export const SideBarItem = (props) => {
  const { href, icon, title, ...others } = props;
  let location = useLocation();
  let navigate = useNavigate();
  const active = href === location.pathname ? true : false;

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          display: "flex",
          mb: 0.5,
          py: 0,
          px: 2,
        }}
        {...others}
      >
        <Button
          startIcon={icon}
          disableRipple
          onClick={(event) => {
            event.preventDefault();
            navigate(href);
          }}
          sx={{
            backgroundColor: active && "rgba(255,255,255, 0.08)",
            borderRadius: 1,
            color: active ? "secondary.main" : "neutral.300",
            fontWeight: active && "fontWeightBold",
            justifyContent: "flex-start",
            px: 3,
            textAlign: "left",
            textTransform: "none",
            width: "100%",
            "& .MuiButton-startIcon": {
              color: active ? "secondary.main" : "neutral.400",
            },
            "&:hover": {
              backgroundColor: "rgba(255,255,255, 0.08)",
            },
          }}
        >
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Button>
      </ListItem>
      <Divider sx={{ borderColor: "#2D3748" }} />
    </>
  );
};

SideBarItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};
