import { styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderStyle = styled("div")(({ theme }) => ({
  margin: "32px auto",
  width: "36px",
  height: "36px",
  border: "solid 5px rgba(210, 210, 210, 0.2)",
  borderRadius: "50%",
  borderTopColor: "rgba(210, 210, 210, 1)",
  animation: `${rotate} 1s infinite`
}));

export default function Loader() {
  return <LoaderStyle />;
}
