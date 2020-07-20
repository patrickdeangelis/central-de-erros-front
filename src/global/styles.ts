import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Roboto', sans-serif;
    }

    body {
        background: #F2F2F2;
    }

    @media only screen and (max-width: 480px) {
        .mobile-wrap {
            flex-wrap: wrap !important;
        }
        .mobile-wrap-reverse {
            flex-wrap: wrap-reverse!important;
        }
    }

    .text-line {
        text-decoration: line-through !important;
    }
`;

export default GlobalStyle;