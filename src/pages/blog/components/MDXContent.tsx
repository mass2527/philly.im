import { getMDXComponent } from 'mdx-bundler/client';
import styled from 'styled-components';

import Sandpack from '@/components/Sandpack';

import Anchor from './Anchor';
import Author from './Author';
import BlockQuote from './BlockQuote';
import Code from './Code';
import Highlight from './Highlight';
import HorizontalLine from './HorizontalLine';
import Mark from './Mark';
import Pre from './Pre';
import Preview from './Preview';
import RegisterLink from './RegisterLink';
import ResponsiveIFrame from './ResponsiveIFrame';
import ResponsiveImage from './ResponsiveImage';

function MDXContent({ code }: { code: string }) {
  const MDXComponent = getMDXComponent(code);

  return (
    <MDXComponentWrapper>
      <MDXComponent
        components={{
          ResponsiveIFrame,
          pre: Pre,
          code: Code,
          Highlight,
          RegisterLink,
          Preview,
          blockquote: BlockQuote,
          a: Anchor,
          Mark,
          hr: HorizontalLine,
          Sandpack,
          Author,
          img: ResponsiveImage,
        }}
      />
    </MDXComponentWrapper>
  );
}

const MDXComponentWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.spacers[48]};

  h1,
  h2,
  h3,
  h4 {
    margin-top: 2em;
    margin-bottom: 0.5em;
  }

  p {
    margin-top: 0;
  }

  ul {
    list-style-type: circle;
  }

  ul,
  ol {
    margin: ${({ theme }) => theme.spacers[16]};

    > li {
      margin-bottom: ${({ theme }) => theme.spacers[8]};
    }
  }

  ol > li {
    list-style: decimal;
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.colors.whiteA9};
    padding: ${({ theme }) => theme.spacers[8]};
  }
`;

export default MDXContent;
