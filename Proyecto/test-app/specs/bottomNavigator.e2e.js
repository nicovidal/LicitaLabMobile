describe('Login Flow', () => {
    it('should log in with valid credentials', async () => {
        // Espera que la aplicación se inicie
        await $('~Correo electrónico').waitForDisplayed(10000);

        // Ingresa el correo electrónico
        const emailInput = await $('~Correo electrónico');
        await emailInput.setValue('nico.vidal.m@gmail.com');

        // Espera 5 segundos antes de ingresar la contraseña
        await browser.pause(5000);

        // Ingresa la contraseña
        const passwordInput = await $('~Contraseña');
        await passwordInput.setValue('n1234567');

        // Presiona el botón de "Iniciar sesión"
        const loginButton = await $('~Iniciar sesión');
        await loginButton.click();

        const greetingMessage = await $('~Saludo'); // Cambia esto por el selector correcto
        await greetingMessage.waitForDisplayed(10000); // Ajusta el tiempo de espera si es necesario

        // Asegúrate de que el saludo está visible
        expect(await greetingMessage.isDisplayed()).toBe(true);

        const followClick = await $('~Seguimiento');  // Accede al View que tiene el accessibilityLabel
        await followClick.waitForDisplayed(10000); // Espera a que esté disponible
        await followClick.click();
        
        expect(await followClick.isDisplayed()).toBe(true);
        await browser.pause(5000)

        const cuentaClick = await $('~Cuenta');
        await cuentaClick.waitForDisplayed(10000);
        await cuentaClick.click();

        expect(await cuentaClick.isDisplayed()).toBe(true);
        await browser.pause(5000)

        const ordenCompraClick = await $('~OrdenCompra');
        await ordenCompraClick.waitForDisplayed(10000);
        await ordenCompraClick.click();

        expect(await ordenCompraClick.isDisplayed()).toBe(true);
        await browser.pause(5000)

    });
});
