import { Car, ColumnSpec, StatExtractor } from '@timing71/common'
import { Text, View } from 'react-native'

type Props = {
  car: Car,
  colSpec: ColumnSpec,
  statExtractor: StatExtractor
}

export const TimingTableRow = ({ car, colSpec, statExtractor }: Props) => {
  return (
    <View style={{ flexDirection: 'row', columnGap: 4 }}>
      {
        colSpec.map(
          (stat, idx) => (
            <Text key={idx}>
              { statExtractor.get(car, stat) }
            </Text>
          )
        )
      }
    </View>
  )
}
