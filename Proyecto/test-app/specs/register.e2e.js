describe('RegisterHere', () => {
    it('RegisterHere', async () => {
        const register = await $('~Register');
        await register.waitForDisplayed(10000); // Espera a que esté disponible
        await register.click();
    });
});
