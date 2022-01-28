import { useState } from "react";
import { css } from "@emotion/react";

const App = () => {
  const [sheet, setSheet] = useState(() =>
    Array.from({ length: 10 }, () =>
      Array.from({ length: 5 }, () => `${Math.random()}`)
    )
  );
  const [selected, setSelected] = useState({ rowIndex: 0, colIndex: 0 });

  return (
    <div
      css={css`
        max-width: 80vw;
        max-height: 80vh;
        overflow: scroll;
      `}
    >
      <div
        css={[
          css`
            overflow: hidden;
            width: 150px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            cursor: pointer;
          `,
          css`
            border: 3px solid black;
            background-color: transparent;
            transform: translate(-3px, -3px);
            z-index: 1;
          `,
          css`
            position: absolute;
            top: ${selected.rowIndex * 20}px;
            left: ${selected.colIndex * 150}px;
          `,
        ]}
      />
      <div
        css={css`
          overflow: scroll;
          position: relative;
          height: 100vh;

          & > div {
            border-bottom: 1px solid #ccc;

            & > div:first-of-type {
              border-left: 1px solid #ccc;
            }

            & > div {
              border-right: 1px solid #ccc;
            }
          }
        `}
      >
        {sheet
          .map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                css={[
                  css`
                    overflow: hidden;
                    width: 150px;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    cursor: pointer;
                  `,
                  css`
                    position: absolute;
                    top: ${rowIndex * 20}px;
                    left: ${cellIndex * 150}px;
                  `,
                ]}
                onClick={() => {
                  setSelected({
                    rowIndex,
                    colIndex: cellIndex,
                  });
                }}
              >
                {selected.rowIndex === rowIndex &&
                selected.colIndex === cellIndex
                  ? "SELECTED"
                  : cell}
              </div>
            ))
          )
          .flat()}
      </div>
    </div>
  );
};

export default App;
