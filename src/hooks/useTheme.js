
export function useTheme() {

    const theme = {
        backgroundColor: 'white',
        primaryColor: 'rgb(204,0,0)',
        darkGrey: 'rgb(13,13,13)',
        mediumGrey: 'rgb(96,96,96)',
        lightGrey: 'rgb(144,144,144)',
        lightestGrey: 'rgb(249,249,249)',
        ignoreBackgroundColor: 'rgba(255, 255, 255, 0.85)',
        primaryColorOpacity: 'rgba(204,0,0,0.2)',

        error: '#ef5350',
        warning: '#ff9800',
        info: '#03a9f4',
        success: '#4caf50',

        bold: 600,
        headerHeight: '40px',
        animationDuration: '200ms',
        animationTimingCurve: 'ease-in-out',
        smallBorderRadius: '4px',
        darkBoxShadow: 'rgba(4,9,20,0.18) 0px 0.5rem 1.25rem',
        inputPadding: '0.5rem 1rem',
        labelHeight: '12px',
    }

    const setTheme = () => {
        document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
        document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
        document.documentElement.style.setProperty('--primary-color-opacity', theme.primaryColorOpacity);
        document.documentElement.style.setProperty('--dark-grey', theme.darkGrey);
        document.documentElement.style.setProperty('--medium-grey', theme.mediumGrey);
        document.documentElement.style.setProperty('--light-grey', theme.lightGrey);
        document.documentElement.style.setProperty('--lightest-grey', theme.lightestGrey);
        document.documentElement.style.setProperty('--ignore-background-color', theme.ignoreBackgroundColor);
        document.documentElement.style.setProperty('--header-height', theme.headerHeight);
        document.documentElement.style.setProperty('--bold', theme.bold);
        document.documentElement.style.setProperty('--animation-duration', theme.animationDuration);
        document.documentElement.style.setProperty('--animation-timing-curve', theme.animationTimingCurve);
        document.documentElement.style.setProperty('--small-border-radius', theme.smallBorderRadius);
        document.documentElement.style.setProperty('--dark-box-shadow', theme.darkBoxShadow);
        document.documentElement.style.setProperty('--error', theme.error);
        document.documentElement.style.setProperty('--info', theme.info);
        document.documentElement.style.setProperty('--success', theme.success);
        document.documentElement.style.setProperty('--warning', theme.warning);
        document.documentElement.style.setProperty('--input-padding', theme.inputPadding);
        document.documentElement.style.setProperty('--label-hight', theme.labelHeight);
    }



    return { theme, setTheme };
}