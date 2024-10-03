# Historias de Usuario
# Sprint 1: Historias de Usuario

## Historia de Usuario 1: Como usuario, quiero poder iniciar sesión en la aplicación para acceder a mi cuenta

**Criterios de aceptación**:
- El usuario ingresa su correo electrónico y contraseña para iniciar sesión.
- El sistema valida las credenciales ingresadas.
- Si las credenciales son correctas, el usuario es redirigido al dashboard.


**Notas técnicas**:
- Utilizar autenticación segura con hash de contraseña.
- Limitar el número de intentos fallidos de inicio de sesión para evitar ataques de fuerza bruta.

---

## Historia de Usuario 2: Como usuario autenticado, quiero ver un dashboard para acceder a la información relevante de mi cuenta

**Criterios de aceptación**:
- El usuario es redirigido al dashboard después de iniciar sesión exitosamente.
- El dashboard muestre resumen de las oportunidades que tenga en seguimiento el cliente.


**Notas técnicas**: 
- Mostrar total seguimiento, total licitaciones y total compras agiles.


## Sprint 2: Historias de Usuario

### Historia de Usuario 3: Como usuario, quiero filtrar oportunidades en la pantalla de seguimiento según su tipo

**Criterios de aceptación:**
- El usuario puede seleccionar un filtro de tipo para las oportunidades.
- Las opciones de filtro incluyen "Todas", "Licitaciones", "Compra Ágil" y "Cotizaciones".
- Al seleccionar un tipo, se muestran solo las oportunidades correspondientes.

**Notas técnicas:**
- Implementar un menú desplegable para seleccionar el tipo.
- Mostrar un spinner de carga mientras se aplican los filtros.

---

### Historia de Usuario 4: Como usuario, quiero ver los detalles de una oportunidad seleccionada

**Criterios de aceptación:**
- Al hacer clic en una oportunidad en la pantalla de seguimiento, el usuario es redirigido a una pantalla de detalles.
- La pantalla de detalles muestra la información completa de la oportunidad, incluyendo el título, código, descripción, organismo y fecha de cierre.

**Notas técnicas:**
- Utilizar una tarjeta (Card) que abarque toda la pantalla para mostrar los detalles.

---

### Historia de Usuario 5: Como usuario, quiero que la interfaz de usuario sea responsiva y atractiva

**Criterios de aceptación:**
- Los componentes de la aplicación deben ajustarse bien en diferentes tamaños de pantalla.
- La apariencia de las tarjetas debe ser consistente y agradable visualmente.

**Notas técnicas:**
- Implementar estilos adecuados para asegurar que la interfaz se vea bien en dispositivos móviles.