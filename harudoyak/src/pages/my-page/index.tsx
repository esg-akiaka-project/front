import React from "react";
import Root from "../../style/Root";
import UndoXButton from "@/src/components/buttons/UndoXButton";
import icon_arrow from "@/public/assets/common/icon_arrow.svg";
const MyPageHome: React.FC = () => {
  return (
    <Root>
      <div>MyPageHome</div>
      <UndoXButton icon={icon_arrow} />
    </Root>
  );
};

export default MyPageHome;
