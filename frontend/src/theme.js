import { colorsTuple, createTheme, Progress } from '@mantine/core';

const customBackground = colorsTuple("#FBF7EF")
const customNavy = colorsTuple("#0000A3")
const customWhite = colorsTuple("#FFFFFF");
const customYellow = colorsTuple("#FFD53D");
const customRed = colorsTuple("#EE0202");
const customLightGrey = colorsTuple("#E0E0E0");


export const theme = createTheme({
    colors: {
        customBackground,
        customNavy,
        customWhite,
        customYellow,
        customRed,
        customLightGrey
    },

    fontFamily: 'Cerebri Sans, Calibri',

    components: {
        Progress: Progress.extend({
            styles: (theme) => ({
                root: {
                    backgroundColor: theme.colors.customLightGrey[0]
                }
            })
        })
    }
}) 