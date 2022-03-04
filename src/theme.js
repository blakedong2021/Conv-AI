import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme(
   {
      "palette":{
         mode: 'dark',
         primary: {
            main: '#67c2cf',
         },     
         secondary: {
            main: '#d9b83f',
         },
      },
      "shape": {
         borderRadius: 12
      }      
   }
);

export default appTheme;