describe('Login Flow with Invalid Credentials', () => {
    it('should show an error message for invalid credentials', async () => {
        // Espera que la aplicación se inicie
        await $('~Correo electrónico').waitForDisplayed(10000);

        // Ingresa un correo electrónico incorrecto
        const emailInput = await $('~Correo electrónico');
        await emailInput.setValue('wrong.email@example.com');

        // Espera 5 segundos antes de ingresar la contraseña
        await browser.pause(5000);

        // Ingresa una contraseña incorrecta
        const passwordInput = await $('~Contraseña');
        await passwordInput.setValue('wrongpassword');

        // Presiona el botón de "Iniciar sesión"
        const loginButton = await $('~Iniciar sesión');
        await loginButton.click();

        // Espera que el mensaje de error se muestre
        const errorMessage = await $('~Error en la contraseña o el correo electrónico.'); // Cambia esto por el selector correcto
        await errorMessage.waitForDisplayed(10000); // Ajusta el tiempo de espera si es necesario

        // Asegúrate de que el mensaje de error está visible
        expect(await errorMessage.isDisplayed()).toBe(true);
    });
});
