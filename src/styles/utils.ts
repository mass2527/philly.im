import { css, CSSProperties } from "styled-components";

export const center = css`
  display: grid;
  place-items: center;
`;

function flex(
  flexDirection: CSSProperties["flexDirection"],
  justifyContent: CSSProperties["justifyContent"] = "normal",
  alignItems: CSSProperties["alignItems"] = "normal"
) {
  return css`
    display: flex;
    flex-direction: ${flexDirection};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
  `;
}

export function flexRow(
  justifyContent?: CSSProperties["justifyContent"],
  alignItems?: CSSProperties["alignItems"]
) {
  return flex("row", justifyContent, alignItems);
}

export function flexColumn(
  justifyContent?: CSSProperties["justifyContent"],
  alignItems?: CSSProperties["alignItems"]
) {
  return flex("column", justifyContent, alignItems);
}