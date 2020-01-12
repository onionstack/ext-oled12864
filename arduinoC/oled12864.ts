
enum SIZE {
    //% block="29*29"
    1,
    //% block="58*58"
    2
}

enum LINE {
    //% block="1"
    1,
    //% block="2"
    2,
    //% block="3"
    3,
    //% block="4"
    4
}


//% color="#AA278D" iconWidth=50 iconHeight=40
namespace oled12864 {
    //% block="show [STR] on the [LINE] line"
    //% STR.shadow="string" STR.defl=hello
    //% LINE.shadow="dropdown" LINE.options="LINE" LINE.defl="LINE.A"
    export function println(parameter: any, block: any) {
        let str = parameter.STR.code
        let line = parameter.LINE.code
        generator.addInclude('oled12864', '#include <oled12864.h>');
        generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        generator.addSetup(`myoled.begin`, `myoled.begin();`);
        generator.addCode(`myoled.setCursorLine(${line});\n\tmyoled.printLine(${str});`);
    }

    //% block="show [STR] at x [X] y [Y]"
    //% STR.shadow="string" STR.defl=hello
    //% X.shadow="range" X.params.min=0 X.params.max=127 X.defl=0
    //% Y.shadow="range" Y.params.min=0 Y.params.max=63 Y.defl=0
    export function print(parameter: any, block: any) {
        let str = parameter.STR.code
        let x = parameter.X.code
        let y = parameter.Y.code
        generator.addInclude('oled12864', '#include <oled12864.h>');
        generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        generator.addSetup(`myoled.begin`, `myoled.begin();`);
        generator.addCode(`myoled.setCursor(${x}, ${y});\n\tmyoled.print(${str});`);
    }

    //% block="display QR code [STR] at x [X] y [Y] with size [SIZE]"
    //% STR.shadow="string" STR.defl=http://mindplus.cc
    //% X.shadow="range" X.params.min=0 X.params.max=127 X.defl=0
    //% Y.shadow="range" Y.params.min=0 Y.params.max=63 Y.defl=0
    //% SIZE.shadow="dropdown" SIZE.options="SIZE" SIZE.defl="SIZE.B"
    export function qrcode(parameter: any, block: any) {
        let str = parameter.STR.code
        let x = parameter.X.code
        let y = parameter.Y.code
        let size = parameter.SIZE.code
        generator.addInclude('oled12864', '#include <oled12864.h>');
        generator.addObject(`myoled`, `OLED_12864`, `myoled;`);
        generator.addSetup(`myoled.begin`, `myoled.begin();`);
        generator.addCode(`myoled.qrcode(${x}, ${y}, ${str}, ${size});`);
    }
}
