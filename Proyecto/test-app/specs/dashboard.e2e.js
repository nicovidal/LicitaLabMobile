describe('Login Flow', () => {
    it('should log in with valid credentials and display the dashboard', async () => {
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

        // Espera a que el saludo se muestre después de iniciar sesión
        const greetingMessage = await $('~Saludo');
        await greetingMessage.waitForDisplayed(10000);

        // Asegúrate de que el saludo está visible
        expect(await greetingMessage.isDisplayed()).toBe(true);

        // Espera a que el dashboard se cargue
        const dashboardTitle = await $('~DashBoard'); 
        await dashboardTitle.waitForDisplayed(10000);

        // Verifica que todos los elementos del dashboard estén visibles
        const totalCount = await $('~Total seguimiento');
        await totalCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await totalCount.isDisplayed()).toBe(true);

        const tenderCount = await $('~Licitaciones');
        await tenderCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await tenderCount.isDisplayed()).toBe(true);

        const agileCount = await $('~Compras Agiles');
        await agileCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await agileCount.isDisplayed()).toBe(true);

        const marcoQuotesCount = await $('~Convenio Marco');
        await marcoQuotesCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await marcoQuotesCount.isDisplayed()).toBe(true);

        const quotesCount = await $('~Cotizaciones');
        await quotesCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await quotesCount.isDisplayed()).toBe(true);

        const closingOpportunitiesCount = await $('~Oportunidades que cierran esta semana');
        await closingOpportunitiesCount.waitForDisplayed(10000); // Espera hasta que esté visible
        expect(await closingOpportunitiesCount.isDisplayed()).toBe(true);
    });
});
