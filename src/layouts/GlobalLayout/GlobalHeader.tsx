import { flexRow } from "@/styles/utils/flex";
import Link from "next/link";
import styled from "styled-components";

function GlobalHeader() {
  return (
    <HeaderWrapper>
      <Header>
        <Links>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/tech">
            <a>Tech</a>
          </Link>
          <Link href="/personal">
            <a>Personal</a>
          </Link>
          <Link href="/snippets">
            <a>Snippets</a>
          </Link>
        </Links>
      </Header>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  height: 64px;
`;

const Header = styled.header`
  ${flexRow("space-between", "center")};
  max-width: 1000px;
  width: 100%;
  margin: auto;
  padding: 0 ${({ theme }) => theme.spacers[24]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const Links = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacers[16]};
`;

export default GlobalHeader;