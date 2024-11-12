describe('Purchase Order Flow', () => {
    it('Purchase Order', async () => {
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

        const OrdenCompraClick = await $('~OrdenCompra');  // Accede al View que tiene el accessibilityLabel
        await OrdenCompraClick.waitForDisplayed(10000); // Espera a que esté disponible
        await OrdenCompraClick.click();

        await browser.pause(5000);

        const searchInput = await $('~SearchPurchaseOrder');
        await searchInput.setValue('5055-686');
  
        await browser.pause(5000); 

        await searchInput.setValue('Implante');
        await browser.pause(5000); 

        
    });
});
