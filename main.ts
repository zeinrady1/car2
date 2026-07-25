radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    }
    if (name == "y") {
        y = value
    }
    serial.writeValue(name, value)
})
let rightSpeed = 0
let leftSpeed = 0
let steer = 0
let throttle = 0
let y = 0
let x = 0
x = 512
y = 512
radio.setGroup(1)
radio.setFrequencyBand(4)
nezhaV2.setComboMotor(nezhaV2.MotorPostion.M4, nezhaV2.MotorPostion.M1)
basic.forever(function () {
    if (x > 470 && x < 555) {
        steer = 0
    } else {
        steer = Math.map(x, 0, 1023, 100, -100)
    }
    if (y > 555) {
        throttle = Math.map(y, 555, 1023, 25, 100)
    } else if (y < 470) {
        throttle = Math.map(y, 470, 0, -25, -100)
    } else {
        throttle = 0
    }
    if (throttle == 0 && steer == 0) {
        nezhaV2.comboStop()
    } else {
        leftSpeed = throttle + steer
        rightSpeed = throttle - steer
        if (leftSpeed > 100) {
            leftSpeed = 100
        }
        if (leftSpeed < -100) {
            leftSpeed = -100
        }
        if (rightSpeed > 100) {
            rightSpeed = 100
        }
        if (rightSpeed < -100) {
            rightSpeed = -100
        }
        nezhaV2.comboStart(leftSpeed, rightSpeed)
    }
    basic.pause(50)
})
