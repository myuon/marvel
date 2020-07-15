import React from "react";
import { css } from "@emotion/core";

export const Cell: React.FC<{
  header?: boolean;
  maxWidth?: number;
}> = ({ header, maxWidth, children }) => {
  return (
    <div
      css={css`
        display: table-cell;
        border-right: 1px solid #bbb;
        border-left: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        padding: 2px;
        position: relative;

        &:focus-within::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(25, 128, 255, 1);
        }

        ${header &&
        css`
          background-color: #eee;
          text-align: center;
        `}
        ${maxWidth &&
        css`
          display: inline-block;
          width: ${maxWidth}px;
        `}
      `}
    >
      {children}
    </div>
  );
};
