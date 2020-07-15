import React from "react";
import { css } from "@emotion/core";
import { Rows } from "../components/Rows";

export const Sheet: React.FC = () => {
  return (
    <>
      <header
        css={css`
          padding: 2ex 1em;
          box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.15);
        `}
      >
        <h1>Marvel</h1>
      </header>

      <main
        css={css`
          max-width: 1280px;
          padding: 2ex 1em;
        `}
      >
        <Rows width={10} height={10} />
      </main>
    </>
  );
};
