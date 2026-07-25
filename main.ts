radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        x = value
    }
    if (name == "y") {
        y = value
    }
    if (name == "b") {
        turbo = !(turbo)
        if (turbo) {
            basic.showString("T")
        } else {
            basic.clearScreen()
        }
    }
    serial.writeValue(name, value)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "b") {
        turbo = !(turbo)
        if (turbo) {
            basic.showString("T")
        } else {
            basic.clearScreen()
        }
    }
})
let speed = 0
let target = 0
let turbo = false
let rightSpeed = 0
let leftSpeed = 0
let steer = 0
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
        target = Math.map(y, 555, 1023, 25, 100)
    } else if (y < 470) {
        target = Math.map(y, 470, 0, -25, -100)
    } else {
        target = 0
    }
    if (turbo) {
        if (target > 0) {
            target = 100
        }
        if (target < 0) {
            target = -100
        }
    }
    if (speed < target) {
        speed = speed + 5
        if (speed > target) {
            speed = target
        }
    }
    if (speed > target) {
        speed = speed - 5
        if (speed < target) {
            speed = target
        }
    }
    if (speed == 0 && steer == 0) {
        nezhaV2.comboStop()
    } else {
        leftSpeed = speed + steer
        rightSpeed = speed - steer
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
