import { ActivityIndicator } from 'react-native'
import { colors } from '@/theme'
import { styles } from './styles'

export function Loading({ color }: { color?: string }) {
  return <ActivityIndicator color={color || colors.blue[500]} style={styles.container} />
}