# Testing

## Los testing realizados en esta app son e2e , si quieren ver los realizados, por favor ir a rama QA que esta destinada para los test
## podran encontralos en la carpeta Proyecto/test-app, donde estara todo el ambiente de testing realizando con appium junto a wdio.



//apuntes test
--testing
 navegar a test-app
    appium
    npx react-native start  
    para iniciar metro 
    ejecutar scrip del test
    npx wdio run ./wdio.conf.cjs --spec ./specs/loginFail.e2e.js