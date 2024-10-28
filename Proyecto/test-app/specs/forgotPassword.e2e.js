describe('Forgot Password', () => {
    it('fotgotPassword', async () => {
        const forgotPassword = await $('~Olvidar Contraseña');
        await forgotPassword.waitForDisplayed(10000); // Espera a que esté disponible
        await forgotPassword.click();
    });
});
