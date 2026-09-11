# Cómo se cuenta un proyecto

Dos plantillas: una para el plano (profesional) y otra para el taller (personal). Mismo
número de campos, mismo orden siempre, contenidos distintos.

---

## El plano · proyectos profesionales

| Campo | Qué va aquí |
|---|---|
| **Sector y escala** | Sector, geografía y tamaño. Nunca el nombre del cliente. «Distribución alimentaria · 12 países · 4 sociedades» dice bastante y no compromete nada. |
| **El problema** | Una frase que entienda alguien que no sabe SAP. |
| **La restricción** | Lo que no se podía tocar: la ventana de proceso, el sistema legacy, el presupuesto, la fecha. El campo más valioso de los seis. |
| **La arquitectura** | Qué hablaba con qué, en abstracto. Es el diagrama del nodo. |
| **Mi intervención** | Qué hiciste tú, concreto. Sin «se implementó»: en primera persona. |
| **El resultado** | Un número, con su antes y su después. |

**Reglas**

- Nunca el nombre del cliente, ni el de sus sistemas internos, ni versiones que lo identifiquen.
- Sin captura de pantalla. Si hace falta ilustrar, es un diagrama abstracto.
- Sin número medible no hay proyecto: eso es una línea del CV, no una ficha.
- El flujo de cabecera (`ECC → job batch → IDoc → middleware → WMS`) son tipos de sistema,
  nunca nombres propios.

**Plantilla para rellenar**

```
id:            Proyecto NN
nombre:        
métrica:       antes → después
flujo:         [sistema, paso, sistema, paso, sistema]
sector:        sector · geografía · tamaño
problema:      
restricción:   
arquitectura:  
intervención:  
resultado:     
```

---

## El taller · proyectos personales

| Campo | Qué va aquí |
|---|---|
| **Qué es** | Una frase. Qué hace la cosa. |
| **De dónde salió** | El picor que lo provocó. Casi siempre algo que te molestaba. |
| **Qué aprendí** | El campo que de verdad justifica la sección. |
| **Estado** | Vivo, en pausa o aparcado — y por qué, si fue aparcado. |
| **Stack** | Lenguajes y piezas, separados por `·`. |
| **Dónde está** | Repositorio o demo. Si no hay nada público, se dice. |

**Estados** — se codifican también en el diseño: `vivo` lleva la línea de conexión en color
de acento; `pausa`, línea neutra; `aparcado`, además la ficha se atenúa.

**Reglas**

- Un proyecto abandonado es contenido válido y se cuenta sin excusas. Es lo que hace creíble
  al resto.
- La fecha es la de cuando se empezó: la línea del taller es cronológica.
- Incluir el propio porfolio como una entrada más.

**Plantilla para rellenar**

```
año:           
nombre:        
estado:        vivo | pausa | aparcado
qué es:        
de dónde salió:
qué aprendí:   
estado (texto):
stack:         
dónde está:    
```

---

## Pendiente

Los nueve proyectos del prototipo actual son **contenido de ejemplo**, no trabajo real.
Falta decidir cuáles entran de verdad: cuatro o cinco profesionales y las piezas personales
que quieras enseñar.
