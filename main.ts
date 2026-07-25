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
radio.setGroup(4)
radio.setFrequencyBand(1)
nezhaV2.setComboMotor(nezhaV2.MotorPostion.M1, nezhaV2.MotorPostion.M2)
basic.forever(function () {
    if (x > 500 && x < 525 && y > 500 && y < 525) {
        nezhaV2.comboStop()
    } else {
        throttle = Math.map(y, 0, 1023, -100, 100)
        steer = Math.map(x, 0, 1023, -100, 100)
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
