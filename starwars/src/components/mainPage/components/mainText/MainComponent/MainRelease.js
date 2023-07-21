import { LoremContainer, MainRelease, Release } from "../style";
import { MainReleaseText } from "../../../../../constants/MockData";

function MainReleaseParent() {
  return (
    <MainRelease>
      <Release>
        <p>
          Release Date: <br /> 19 December
        </p>
      </Release>
      <LoremContainer>
        <p>{MainReleaseText}</p>
        <a href="#">Pre-Order ticket now</a>
      </LoremContainer>
    </MainRelease>
  );
}

export default MainReleaseParent;
