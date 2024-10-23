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
        
        const filter = await $('~Filtro');
        await filter.waitForDisplayed(10000);
        await filter.click(); 

        expect(await filter.isDisplayed()).toBe(true);

        const agilClick = await $('~Click Agil');
        await agilClick.waitForDisplayed(10000);
        await agilClick.click(); 

        await browser.pause(5000);

        await filter.waitForDisplayed(10000);
        await filter.click(); 

        expect(await filter.isDisplayed()).toBe(true);

        const cotizacionClick = await $('~Click Cotizaciones');
        await cotizacionClick.waitForDisplayed(10000);
        await cotizacionClick.click();
        
        expect(await filter.isDisplayed()).toBe(true);
        await browser.pause(5000);

        await filter.waitForDisplayed(10000);
        await filter.click(); 

        expect(await filter.isDisplayed()).toBe(true);

        const convenioClick = await $('~Click Convenio');
        await convenioClick.waitForDisplayed(10000);
        await convenioClick.click();
        
        expect(await filter.isDisplayed()).toBe(true);
        await browser.pause(5000);

        

        
    });
});
