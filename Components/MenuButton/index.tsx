// In App.js in a new project

import * as React from 'react'
import {View, Text, TouchableOpacity, Alert} from 'react-native'

function MenuButton(props: {
  label?: string
  width?: number
  height?: number
  backgroundColor?: string
  borderWidth?: number
  borderColor?: string
  borderRadius?: number
  labelColor?: string
  onPress?: any
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
        }}>
        <Text style={{color: labelColor ?? 'blue'}}>
          {label ?? 'Click me!'}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MenuButton
