import React from "react";
import { css } from "@emotion/core";

export const Sheet: React.FC = () => {
  return (
    <header
      css={css`
        height: 100px;
      `}
    >
      Marvel
    </header>
  );
};
