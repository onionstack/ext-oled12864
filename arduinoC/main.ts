
enum BTN {
    //% block="A"
    A,
    //% block="B"
    B,
    //% block="A+B"
    AB
}

enum TYPE {
    //% block="Integer"
    INT
}


//% color="#AA278D" iconWidth=50 iconHeight=40
namespace xxx {
    //% block="when press [BUTTON]" blockType="hat"
    //% board="microbit"
    //% BUTTON.shadow="dropdown" BUTTON.options="BTN" BUTTON.defl="BTN.A"
    export function buttonPress(parameter: any, block: any) {
        let button: string = parameter.BUTTON.code.replace("+", "");
        let name: string = 'button' + button + 'Callback';
        generator.addEvent(name, "void", name, "", true);
        generator.addSetup(block.id, `onEvent(ID_BUTTON_${button}, PRESS, ${name});`, false);
    }

    //% block="set pin [PIN] lightness [LIGHT]" blockType="command"
    //% PIN.shadow="dropdownRound" PIN.options="PINA"
    //% LIGHT.shadow="range" LIGHT.params.min=0 LIGHT.params.max=255 LIGHT.defl=255
    export function setBrightness(parameter: any) {
        let pin: string = parameter.PIN.code;
        let brightness: string = parameter.LIGHT.code;
        pin =  this.getPin(pin);
        generator.addInclude('DFRobot_NeoPixel', '#include <DFRobot_NeoPixel.h>');
        generator.addObject(`neoPixel_${pin};`, `DFRobot_NeoPixel`, `neoPixel_${pin};`);
        generator.addSetup(`neoPixel_${pin}.begin`, `neoPixel_${pin}.begin(${pin}, 5, 255);`);
        generator.addCode(`neoPixel_${pin}.setBrightness(${brightness});`);
    }

    //% block="[PIN] pin is connected?" blockType="boolean"
    //% PIN.shadow="dropdown" PIN.options="ALLPIN"
    //% Flag.shadow="boolean"
    export function isConnected(parameter: any) {
        let pin: string = parameter.PIN.code.slice(parameter.PIN.code.length - 1);
        generator.addCode([`isTouched(${pin})`, generator.ORDER_UNARY_POSTFIX]);
    }

    //% block="not [Flag]" blockType="boolean"
    //% Flag.shadow="boolean"
    export function notTrue(parameter: any) {
        console.log("notTrue==", parameter);
        let code: string = '!' + (parameter.Flag.code || 'false') + '';
        generator.addCode([code, generator.ORDER_UNARY_PREFIX]);
    }

    //% block="read serial data int or float [READTYPE]" blockType="reporter"
    //% READTYPE.shadow="dropdown" READTYPE.options="TYPE"
    export function readserialIntfloat(parameter: any, block: any) {
        let type: string = generator.getParameter(block).READTYPE.code;
        generator.addSetupMainTop('Serial.begin', "Serial.begin(9600);", false);
        if (type === "INT") {
            generator.addCode([`Serial.parseInt()`, generator.ORDER_ATOMIC]);
        } else {
            generator.addCode([`Serial.parseFloat()`, generator.ORDER_ATOMIC]);
        }
    }

    //% block="set wireless channel [NUM]" blockType="command"
    //% NUM.shadow="number" NUM.defl=7
    export function setWirelessChannel(parameter: any) {
        generator.addInclude('DFMicrobit_Radio', '#include <DFMicrobit_Radio.h>');
        generator.addCode(`Radio.setGroup(${parameter.NUM.code});`);
    }

    //% block="print [STR]" blockType="command"
    //% STR.shadow="string" STR.defl=hello
    export function printStr(parameter: any) {
        generator.addSetupMainTop('Serial.begin', "Serial.begin(9600);", false);
        const code: string = `Serial.println(${parameter.STR.code});`;
        generator.addCode(code);
    }
}
