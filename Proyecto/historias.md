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
