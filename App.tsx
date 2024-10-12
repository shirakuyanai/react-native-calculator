import React, {useEffect, useState} from 'react'
import {TouchableOpacity, Text, View, Alert, PanResponder} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import CustomButton from './Components/CustomButton'
import {SafeAreaView} from 'react-native-safe-area-context'

function App() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [leftSide, setLeftSide] = useState(true)
  const [output, setOutput] = useState(0)
  const [operator, setOperator] = useState('')
  const [selectedOperator, setSelectedOperator] = useState('')
  const [display_result, setDisplayResult] = useState(false)
  const [displaySize, setDisplaySize] = useState(85)
  const [displayNumber, setDisplayNumber] = useState(0)
  const [dotEnabled, setDotEnabled] = useState(false)
  const [decimalCount, setDecimalCount] = useState(0)

  const handlePressNumber = (value: number) => {
    if (leftSide) {
      setA((val: number) => {
        if (val.toString().length >= 9) return val
        let new_val = 0
        if (dotEnabled) {
          setDecimalCount(decimalCount + 1) // Increase decimal count
          new_val = val + value / Math.pow(10, decimalCount + 1) // Adjust the value by the right decimal place
        } else {
          new_val = val * 10 + value // Normal number input
        }

        return new_val
      })
    } else {
      setB((val: number) => {
        if (val.toString().length >= 9) return val
        let new_val = 0
        if (dotEnabled) {
          setDecimalCount(decimalCount + 1) // Increase decimal count
          new_val = val + value / Math.pow(10, decimalCount + 1) // Adjust the value by the right decimal place
        } else {
          new_val = val * 10 + value // Normal number input
        }

        return new_val
      })
      setSelectedOperator('')
    }
  }

  const handlePressInverse = () => {
    if (leftSide || (!display_result && b === 0)) {
      setA((val: number) => {
        return val * -1
      })
    } else {
      setB((val: number) => {
        return val * -1
      })
    }
    if (output !== 0) {
      setA(displayNumber * -1)
      setLeftSide(true)
    }
  }

  const handlePressPercent = () => {
    if (dotEnabled) setDotEnabled(false)
    if (leftSide) {
      setA((val: number) => {
        return val / 100
      })
    } else {
      setB((val: number) => {
        return val / 100
      })
    }
  }

  const handleCal = () => {
    if (dotEnabled) setDotEnabled(false)
    let result = 0
    if (leftSide) {
      result = a
    } else {
      if (a === 0 && b === 0) {
        result = 0
      } else {
        switch (operator) {
          case '+':
            result = a + b
            break
          case '-':
            result = a - b
            break
          case 'X':
            result = a * b
            break
          case '÷':
            result = a / b
            break
          default:
            break
        }
      }
    }
    setOutput(result)
    setA(result) // Set a to the output, allowing further calculations
    setB(0) // Clear b for the next input
    setOperator('') // Clear operator
    setSelectedOperator('')
    setDisplayResult(true)
    setLeftSide(true) // Reset to left side for the next calculation
  }

  const format_number = (num: number) => {
    if (Number.isNaN(num)) return '0'

    const absNum = Math.abs(num)

    // If the number is too large or too small, use scientific notation
    if (absNum >= 1e9 || (absNum <= 1e-6 && absNum !== 0)) {
      // Convert to scientific notation with 2 decimal places
      return num.toExponential(2).replace('e+', 'e')
    }

    // Otherwise, format normally with commas and up to 6 decimal places
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    }).format(num)
  }

  useEffect(() => {
    setDisplayNumber(leftSide ? a : display_result ? output : b !== 0 ? b : a)
    const current_number = format_number(displayNumber)
    if (current_number.toString().length > 6 && displaySize !== 54) {
      setDisplaySize(54)
    } else if (current_number.toString().length <= 6 && displaySize !== 85) {
      setDisplaySize(85)
    }
  })

  const handleCopy = () => {
    Clipboard.setString(displayNumber.toString()) // Copy the text to clipboard
    Alert.alert('Result copied to clipboard!')
  }

  const handleDeleteLastDigit = () => {
    if (leftSide || (!display_result && b === 0)) {
      setA(val => {
        const stringValue = val.toString()
        let newValue = stringValue.slice(0, -1)
        if (newValue[newValue.length - 1] === '.') {
          newValue = newValue.slice(0, -1)

          setDotEnabled(false)
        }
        if (decimalCount > 1) setDecimalCount(decimalCount - 1)

        return newValue ? Number(newValue) : 0
      })
    } else {
      if (display_result) {
        setOutput(val => {
          const stringValue = val.toString()
          let newValue = stringValue.slice(0, -1)
          if (newValue[newValue.length - 1] === '.') {
            newValue = newValue.slice(0, -1)
            setDotEnabled(false)
          }
          if (decimalCount > 1) setDecimalCount(decimalCount - 1)

          return newValue ? Number(newValue) : 0
        })
      } else {
        setB(val => {
          const stringValue = val.toString()
          let newValue = stringValue.slice(0, -1)
          if (newValue[newValue.length - 1] === '.') {
            newValue = newValue.slice(0, -1)
            setDotEnabled(false)
          }
          if (decimalCount > 1) setDecimalCount(decimalCount - 1)

          return newValue ? Number(newValue) : 0
        })
      }
    }
  }

  // Set up PanResponder for swipe detection
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // If the swipe is horizontal, start responding
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 50) {
        handleDeleteLastDigit()
      }
    },
  })

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View>
        <View {...panResponder.panHandlers}>
          <TouchableOpacity activeOpacity={1} onLongPress={() => handleCopy()}>
            <Text
              style={{
                fontSize: displaySize ?? 85,
                color: 'white',
                textAlign: 'right',
                marginRight: 15,
              }}>
              {dotEnabled && displayNumber % 1 === 0
                ? format_number(displayNumber) + '.'
                : format_number(displayNumber)}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <CustomButton
            backgroundColor="gray"
            label="AC"
            onPress={() => {
              setOutput(0)
              setA(0)
              setB(0)
              setOperator('')
              setDisplayResult(false)
              setSelectedOperator('')
              setLeftSide(true)
              setDotEnabled(false)
              setDecimalCount(0)
            }}
            labelColor="black"
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="gray"
            label="+/-"
            onPress={handlePressInverse}
            labelColor="black"
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="gray"
            label="%"
            labelColor="black"
            onPress={handlePressPercent}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor={selectedOperator === '÷' ? 'white' : 'orange'}
            label="÷"
            labelColor={selectedOperator === '÷' ? 'orange' : 'white'}
            onPress={() => {
              if (operator && b !== 0) {
                handleCal()
              }
              if (output !== 0) {
                setA(displayNumber)
              }
              setDecimalCount(0)
              if (dotEnabled) setDotEnabled(false)
              setDisplayResult(false)
              setOperator('÷')
              setSelectedOperator('÷')
              setLeftSide(false)
            }}
            fontSize={45}
            width={80}
            height={80}
            borderRadius={40}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <CustomButton
            backgroundColor="#383838"
            label="7"
            labelColor="white"
            onPress={() => handlePressNumber(7)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="8"
            labelColor="white"
            onPress={() => handlePressNumber(8)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="9"
            labelColor="white"
            onPress={() => handlePressNumber(9)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor={selectedOperator === 'X' ? 'white' : 'orange'}
            label="X"
            labelColor={selectedOperator === 'X' ? 'orange' : 'white'}
            onPress={() => {
              if (operator && b !== 0) {
                handleCal()
              }
              if (output !== 0) {
                setA(displayNumber)
              }
              setDecimalCount(0)
              if (dotEnabled) setDotEnabled(false)
              setDisplayResult(false)
              setOperator('X')
              setSelectedOperator('X')
              setLeftSide(false)
            }}
            width={80}
            height={80}
            borderRadius={40}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <CustomButton
            backgroundColor="#383838"
            label="4"
            labelColor="white"
            onPress={() => handlePressNumber(4)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="5"
            labelColor="white"
            onPress={() => handlePressNumber(5)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="6"
            labelColor="white"
            onPress={() => handlePressNumber(6)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor={selectedOperator === '-' ? 'white' : 'orange'}
            label="-"
            labelColor={selectedOperator === '-' ? 'orange' : 'white'}
            onPress={() => {
              if (operator && b !== 0) {
                handleCal()
              }
              if (output !== 0) {
                setA(displayNumber)
              }
              setDecimalCount(0)
              if (dotEnabled) setDotEnabled(false)
              setDisplayResult(false)
              setOperator('-')
              setSelectedOperator('-')
              setLeftSide(false)
            }}
            fontSize={45}
            width={80}
            height={80}
            borderRadius={40}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <CustomButton
            backgroundColor="#383838"
            label="1"
            labelColor="white"
            onPress={() => handlePressNumber(1)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="2"
            labelColor="white"
            onPress={() => handlePressNumber(2)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="3"
            labelColor="white"
            onPress={() => handlePressNumber(3)}
            width={80}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor={selectedOperator === '+' ? 'white' : 'orange'}
            label="+"
            labelColor={selectedOperator === '+' ? 'orange' : 'white'}
            onPress={() => {
              if (operator && b !== 0) {
                handleCal()
              }
              if (output !== 0) {
                setA(displayNumber)
              }
              setDecimalCount(0)
              if (dotEnabled) setDotEnabled(false)
              setDisplayResult(false)
              setOperator('+')
              setSelectedOperator('+')
              setLeftSide(false)
            }}
            fontSize={45}
            width={80}
            height={80}
            borderRadius={40}
          />
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <CustomButton
            backgroundColor="#383838"
            label="0"
            labelColor="white"
            onPress={() => handlePressNumber(0)}
            width={170}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="#383838"
            label="."
            labelColor="white"
            onPress={() => {
              if (!dotEnabled && displayNumber < 999999999) setDotEnabled(true)
            }}
            width={80}
            fontSize={45}
            height={80}
            borderRadius={40}
          />
          <CustomButton
            backgroundColor="orange"
            label="="
            labelColor="white"
            onPress={handleCal}
            fontSize={45}
            width={80}
            height={80}
            borderRadius={40}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default App
