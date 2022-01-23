import { ThemedCssFunction, css } from "styled-components";

export const breakpoints = {
    sm: 520,
    md: 960,
    lg: 1280,
};

type tMediaQueriesCBArgs<T extends object> = Parameters<ThemedCssFunction<T>>;
export const mediaQueries = <T extends object>(key: keyof typeof breakpoints) => {
    return (first: tMediaQueriesCBArgs<T>[0], ...interpolations: tMediaQueriesCBArgs<T>[1][]) =>
        css`
            @media screen and (min-width: ${breakpoints[key]}px) { 
                ${first};
                ${interpolations};
            }
        `;
};

export const mediaQueriesForSimpleString = (key: keyof typeof breakpoints) => {
    return (style: TemplateStringsArray | String) =>
        `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};