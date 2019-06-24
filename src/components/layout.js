import React from 'react';
import { createPortal } from 'react-dom';
import SiteNav from './site-nav';
import { Global, css } from '@emotion/core';

import '../../static/fonts.css';

export default function Layout({ location, title, children }) {
  return (
    <div
      css={css`
        position: relative;
        z-index: 1; /* layout should be on top of background animation */
      `}
    >
      <Global
        styles={css`
          html {
            text-size-adjust: 100%;
            font-size: 100%;
            background-color: rgb(179, 255, 242);
          }

          body {
            margin: 0;
            background-color: inherit;
            color: #494949;
            font-family: Helvetica, Arial, sans-serif;
          }
        `}
      />
      <BackgroundAnimation />
      <header>
        <SiteNav
          title={title}
          isHomePage={location.pathname === `${__PATH_PREFIX__}/`}
        />
      </header>
      <main
        css={css`
          max-width: 1200px;
          padding-left: 24px;
          padding-right: 24px;
          margin-left: auto;
          margin-right: auto;
        `}
      >
        {children}
      </main>
      <footer>©{new Date().getFullYear()} Ryan Boone</footer>
    </div>
  );
}

// base-level support is mix-blend-mode: screen;
function BackgroundAnimation() {
  const canvasRef = React.useRef(null);

  if (canvasRef.current) {
    console.log(canvasRef.current);
  }

  return typeof document !== 'undefined'
    ? createPortal(
        <canvas
          ref={el => (canvasRef.current = el)}
          height="2000"
          width="2000"
          css={css`
            background: black;
            mix-blend-mode: screen;
            position: fixed;
            top: 0;
            left: 0;
            min-width: 100%;
            min-height: 100%;
          `}
        ></canvas>,
        document.body
      )
    : null;
}
