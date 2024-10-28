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
        await passwordInput.setValue('abcdefgh');

        // Presiona el botón de "Iniciar sesión"
        const showPassword = await $('~ShowPassword');
        await showPassword.click();
        
        await browser.pause(5000);
    });
});
