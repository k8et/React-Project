import img from "../../../../assets/img/circleText.png";
import { CircleText, CircleTextContainer } from "./style";

function CircleTextComponent() {
  return (
    <CircleTextContainer>
      <CircleText src={img} alt="text" />
    </CircleTextContainer>
  );
}
export default CircleTextComponent;
