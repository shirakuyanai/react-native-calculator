import React, {useEffect, useState} from 'react'
import {Alert, SafeAreaView, Text, View} from 'react-native'

import CustomButton from './Components/CustomButton'

function App() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [leftSide, setLeftSide] = useState(true)
  const [output, setOutput] = useState(0)
  const [operator, setOperator] = useState('')
  const [selectedOperator, setSelectedOperator] = useState('')
  const [display_result, setDisplayResult] = useState(false)

  const handlePressNumber = (value: number) => {
    if (leftSide) {
      setA((val: number) => {
        return val * 10 + value
      })
    } else {
      setB((val: number) => {
        return val * 10 + value
      })
      setSelectedOperator('')
    }
  }

  const handlePressInverse = () => {
    if (leftSide) {
      setA((val: number) => {
        return val * -1
      })
    } else {
      setB((val: number) => {
        return val * -1
      })
    }
  }

  const handlePressPercent = () => {
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
    if (a === 0 && b === 0) {
      setOutput(0)
    } else {
      if (operator === '+') {
        setOutput(a + b)
      } else if (operator === '-') {
        setOutput(a - b)
      } else if (operator === 'X') {
        setOutput(a * b)
      } else if (operator === '÷') {
        setOutput(a / b)
      }
    }
    setA(0)
    setB(0)
    setOperator('')
    setDisplayResult(true)
    setSelectedOperator('')
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'black',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 85,
              color: 'white',
              textAlign: 'right',
              marginRight: 15,
            }}>
            {leftSide ? a : display_result ? output : b}
          </Text>
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
              if (operator) {
                handleCal()
              }
              if (output !== 0) {
                setA(output)
              }
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
              if (operator) {
                handleCal()
              }
              if (output !== 0) {
                setA(output)
              }
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
              if (operator) {
                handleCal()
              }
              if (output !== 0) {
                setA(output)
              }
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
              if (operator) {
                handleCal()
              }
              if (output !== 0) {
                setA(output)
              }
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
            label=","
            labelColor="white"
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
