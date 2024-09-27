// In App.js in a new project

import * as React from 'react'
import {View, Text, TouchableOpacity, Alert} from 'react-native'

function CustomButton(props: {
  label?: string
  width?: number
  height?: number
  backgroundColor?: string
  borderWidth?: number
  borderColor?: string
  borderRadius?: number
  labelColor?: string
  onPress?: any
  fontSize?: number
}) {
  const {
    label,
    width,
    height,
    backgroundColor,
    borderWidth,
    borderColor,
    borderRadius,
    labelColor,
    onPress,
    fontSize,
  } = props
  return (
    <TouchableOpacity
      onPress={onPress ?? null}
      style={{
        width: width ?? 200,
        height: height ?? 100,
        backgroundColor: backgroundColor ?? 'transparent',
        borderRadius: borderRadius ?? 0,
      }}>
      <View
        style={{
          borderWidth: borderWidth ?? 1,
          borderColor: borderColor ?? 'transparent',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            color: labelColor ?? 'blue',
            textAlign: 'center',
            fontSize: fontSize ?? 30,
          }}>
          {label ?? 'Click me!'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default CustomButton
