# Simulador de Pedidos (Entrega 3)

## Descripción

El Simulador de Pedidos es una aplicación web que permite a los usuarios seleccionar productos, agregar cantidades, ver el total de su carrito de compras y aplicar cupones de descuento. Está desarrollado utilizando HTML, CSS y JavaScript, y simula un entorno de compras en línea con funcionalidades dinámicas y validaciones mejoradas.

## Funcionalidades

- **Selección de productos**: El usuario puede seleccionar productos de un menú desplegable con precios predefinidos.
- **Cantidad de productos**: Posibilidad de seleccionar la cantidad deseada de cada producto con validación para asegurarse de que sea un número positivo.
- **Agregar al carrito**: Los productos seleccionados pueden ser añadidos al carrito de compras.
- **Visualización y gestión del carrito**: Visualización de los productos en el carrito, con la opción de eliminar elementos.
- **Cálculo del total**: Cálculo automático del total del carrito, con actualización en tiempo real.
- **Aplicar cupones de descuento**: El usuario puede aplicar un cupón de descuento del 5% si ingresa un código válido de 6 números.
- **Realizar pedidos**: Simulación de la finalización del pedido, con vaciado automático del carrito tras la compra.
- **Manejo de errores**: Manejo de errores robusto, incluyendo la gestión de almacenamiento local y validaciones de productos.

## Estructura del Proyecto

El proyecto contiene los siguientes archivos en la raíz del repositorio:

- `index.html`: Estructura principal de la página web, que incluye el formulario de pedidos y el carrito de compras.
- `styles.css`: Estilos CSS que definen la apariencia visual de la aplicación, incluyendo colores, fuentes, animaciones y transiciones mejoradas.
- `main.js`: Archivo JavaScript que maneja la lógica del simulador, incluyendo la gestión de productos, el carrito, el cálculo de precios, la aplicación de cupones, validaciones y manejo de errores.

## Cómo Ejecutar

1. Clona este repositorio:
   `git clone https://github.com/GimeSozzi/PreEntrega3_JavaScript_SozziGimena.git`

2. Navega al directorio del proyecto:
   `cd PreEntrega3_JavaScript_SozziGimena`

3. Abre el `index.html` en tu navegador:
   - `start index.html` (En Windows)
   - `open index.html` (En Mac)
   - `xdg-open index.html` (En Linux)

## Uso

1. Selecciona un producto del menú desplegable.
2. Ingresa la cantidad deseada (debe ser un número mayor a 0).
3. Haz clic en "Agregar al Carrito" para añadir el producto al carrito.
4. Revisa los productos en el carrito; puedes eliminar productos si es necesario.
5. Haz clic en "Aplicar Cupón de Descuento" y escribe un código de 6 números para aplicar un descuento del 5%.
6. Verifica el total del carrito, incluyendo el descuento si aplica.
7. Haz clic en "Realizar Pedido" para simular la finalización de la compra. El carrito se vaciará automáticamente después de confirmar el pedido.

## Mejoras Implementadas

- **Validaciones adicionales**: Se agregó validación para asegurarse de que la cantidad ingresada sea un número positivo.
- **Manejo de errores**: Se agregó manejo de errores al interactuar con `localStorage`, mostrando mensajes apropiados si el almacenamiento local está lleno.
- **Experiencia de usuario**: Se mejoró la experiencia del usuario con animaciones más suaves y transiciones para los elementos del carrito.
- **Documentación**: Se añadió documentación detallada en el código para facilitar su comprensión y mantenimiento.
