import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class RootDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          {/* https://polyfill.io/v3/url-builder/ */}

          <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RootDocument;

// import Document, { Html, Main, NextScript, Head } from "next/document";
// import Helmet from "react-helmet";
// import { ServerStyleSheet } from "styled-components";

// class RootDocument extends Document {
//   static getInitialProps(context) {
//     const sheet = new ServerStyleSheet();
//     const page = context.renderPage(
//       (App) => (props) => sheet.collectStyles(<App {...props} />)
//     );
//     const styleTags = sheet.getStyleElement();
//     return { ...page, helmet: Helmet.renderStatic(), styleTags };
//   }

//   render() {
//     const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
//     const htmlAttrs = htmlAttributes.toComponent();
//     const bodyAttrs = bodyAttributes.toComponent();

//     return (
//       <Html {...htmlAttrs}>
//         <Head>
//           {this.props.styleTags}
//           {Object.values(helmet).map((el) => el.toComponent())}
//         </Head>
//         <body {...bodyAttrs}>
//           <Main />
//           {/* https://polyfill.io/v3/url-builder/ */}
//           <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019" />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

// export default RootDocument;
