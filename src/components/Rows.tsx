import React, { useState, useCallback, useRef } from "react";
import { css } from "@emotion/core";
import { Cell } from "./Cell";

export interface RowsProps {
  width: number;
  height: number;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const displayColumn = (index: number) => {
  return `${
    index >= alphabet.length
      ? ((index / alphabet.length) % alphabet.length).toString()
      : ""
  }${alphabet[index % alphabet.length]}`;
};

const Row: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: flex;

        font-size: 14px;
      `}
    >
      {children}
    </div>
  );
};

const RowBody: React.FC = ({ children }) => {
  return (
    <div
      css={css`
        display: table;
        width: 100%;
        border-collapse: collapse;
        table-layout: fixed;
      `}
    >
      {children}
    </div>
  );
};

export const Rows: React.FC<RowsProps> = ({ width, height }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState([0, 0]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (sheetRef.current && event.clientX > 50) {
        const ix = Math.floor(
          (event.clientX - 50 - sheetRef.current.offsetLeft) /
            ((sheetRef.current.clientWidth - 50) / width)
        );
        const iy =
          Math.floor(
            (event.clientY - sheetRef.current.offsetTop) /
              (sheetRef.current.clientHeight / (height + 1))
          ) - 1;

        if (iy >= 0) {
          setCursor([ix, iy]);
        }
      }
    },
    [height, width]
  );

  return (
    <div
      css={css`
        color: #333;
        border-top: 1px solid #bbb;
        position: relative;
      `}
      onClick={handleClick}
      ref={sheetRef}
    >
      <Row>
        <Cell header maxWidth={50}>
          &nbsp;
        </Cell>
        <RowBody>
          {Array.from(Array(width), (_, k) => k).map((_, index) => (
            <Cell header key={index}>
              {displayColumn(index)}
            </Cell>
          ))}
        </RowBody>
      </Row>
      {Array.from(Array(height), (_, k) => k).map((_, y) => (
        <Row key={y}>
          <Cell header maxWidth={50}>
            {y}
          </Cell>
          <RowBody>
            {Array.from(Array(width), (_, k) => k).map((_, x) => (
              <Cell key={x} selected={cursor[0] === x && cursor[1] === y}>
                <input
                  css={css`
                    outline: none;
                    width: 100%;
                  `}
                />
              </Cell>
            ))}
          </RowBody>
        </Row>
      ))}
    </div>
  );
};
