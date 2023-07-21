import { Body } from "./main-style";
import "../../assets/img/mainBackground.png";
import MainTextComponent from "./components/mainText/mainText";
import CircleTextComponent from "./components/circleText/circleText";

function MainPage() {
  return (
    <Body>
      <MainTextComponent />
      <CircleTextComponent />
    </Body>
  );
}
export default MainPage;
