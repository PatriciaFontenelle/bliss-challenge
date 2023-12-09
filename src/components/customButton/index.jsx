import "./style.css";

const Button = ({
  color = "primary",
  type = "solid",
  text,
  icon,
  iconPlacement = "start",
  ...rest
}) => {
  const colors = {
    primary: "#011638",
    secondary: "364156",
  };

  const typeStyle = {
    solid: {
      backgroundColor: colors[color] || color,
      border: `2px solid ${colors[color] || color}`,
      color: "#FFF",
    },

    outline: {
      border: `2px solid ${colors[color] || color}`,
      color: colors[color] || color,
      boxSizing: "borde-box",
    },

    icon: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      padding: 0,
      color: colors[color] || color,
    },

    link: {
      backgroundColor: "transparent",
      border: "none",
      outline: "none",
      padding: 0,
      color: colors[color] || color,
      textDecoration: "underline",
    },
  };

  return (
    <button {...rest} style={typeStyle[type]} className="custom-btn">
      {icon && iconPlacement === "start" && icon}
      {text}
      {icon && iconPlacement === "end" && icon}
    </button>
  );
};

export default Button;
