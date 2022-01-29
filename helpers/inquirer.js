const inquirer = require('inquirer');

require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer',
        choices: [
            {
                value: 1,
                name: `${ '1.'.red } Buscar ciudad`
            },
            {
                value: 2,
                name: `${ '2.'.yellow } Historial`
            },
            {
                value: 3,
                name: `${ '3.'.blue } Clear history`
            },
            {
                value: 0,
                name: `${ '0.'.green } Salir \n`
            }
        ]
    }
];

const qPause =  {
        type: 'input',
        name: 'cerrar',
        message: `\nPrecione ${'Enter'.green} para continuar`
    }
;


const inquirerMenu = async() => {
    console.clear();
    console.log('Seleccione una opción del menú'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const { salir } = await inquirer.prompt(qPause);

    return salir;
}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

const listarLugares = async(lugares = []) => {
    const choices = lugares.map((lugar, i) => {
        const idx =  `${i + 1}`.green;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }   
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione una opción: ', 
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;

}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx =  `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.compleadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione', 
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}


const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}
module.exports = {
    pausa,
    confirmar,
    leerInput,
    inquirerMenu,
    listarLugares,
    mostrarListadoCheckList
}
