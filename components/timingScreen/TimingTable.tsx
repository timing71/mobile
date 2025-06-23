import { Colors } from '@/constants/Colors'
import { ServiceState, Stat, StatExtractor } from '@timing71/common'
import { useMemo } from 'react'
import { ScrollView, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { carStateRow, carStateRowAlt } from './colours'
import { TimingTableCell } from './TimingTableCell'

type Props = {
  state: ServiceState
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6,
  },
  innerWrapper: {
    flexDirection: 'row',
    marginBottom: 85 // Bottom tab bar height - TODO move this to the page component
  },
  table: {
    alignItems: 'flex-start'
  },
  column: {
    flexDirection: 'column'
  },
  cell: {
    maxWidth: 200,
    color: 'white',
  },
  row: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  rowAlt: {
    backgroundColor: Colors.app.backgroundAlt
  },
  headerRow: {
    borderBottomWidth: 1,
    borderColor: Colors.app.highlight,
    fontFamily: 'Play-Regular',
  },
  header: {
    color: Colors.app.highlight,
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'DejaVuSans',
    height: 30,
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  highlight: {
    color: Colors.app.highlight
  },
  cellContent: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'DejaVuSans',
    height: 30,
    paddingHorizontal: 4,
    paddingVertical: 2
  },
  right: {
    textAlign: 'right'
  },
  sbNewRow: {
    backgroundColor: Colors.app.code60
  },
  sbNewCell: {
    color: 'black'
  }
});

export const TimingTable = ({ state }: Props) => {

  const statExtractor = useMemo(
    () => new StatExtractor(state.manifest.colSpec),
    [state.manifest.colSpec]
  );

  const rowStyles = useMemo(
    () => {
      const stylesArr: StyleProp<TextStyle>[][] = [];

      (state.cars || []).forEach(
        (car, idx) => {
          const carStyles: StyleProp<TextStyle>[] = [];

          const carState = statExtractor.get(car, Stat.STATE);
          const lastLap = statExtractor.get(car, Stat.LAST_LAP);
          const bestLap = statExtractor.get(car, Stat.BEST_LAP);

          const shouldShowSB = lastLap[1] === 'sb-new' || bestLap[1] === 'sb-new';

          if (carStateRow[carState]) {
            carStyles.push(carStateRow[carState])
          }

          if (shouldShowSB) {
            carStyles.push(styles.sbNewRow);
          }

          if (idx % 2 === 1) {
            if (!shouldShowSB) {
              carStyles.push(styles.rowAlt);
            }
            if (carStateRowAlt[carState]) {
              carStyles.push(carStateRowAlt[carState])
            }
          }
          stylesArr.push(carStyles);
        }
      )

      return stylesArr;
    },
    [state.cars, statExtractor]
  )

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.column}>
          <View style={styles.cell}>
            <Text style={[styles.header, styles.right, styles.headerRow]}>Pos</Text>
          </View>
          {
            (state.cars || []).map(
              (_car, idx) => (
                <View
                  key={idx}
                  style={styles.cell}
                >
                  <Text
                    style={[styles.header, styles.right, ...rowStyles[idx]]}
                  >
                    {idx + 1}
                  </Text>
                </View>
              )
            )
          }
        </View>
        <View style={styles.column}>
          <View style={styles.cell}>
            <Text style={[styles.header, styles.right, styles.headerRow]}>Num</Text>
          </View>
          {
            (state.cars || []).map(
              (car, idx) => (
                <View
                  key={idx}
                  style={styles.cell}
                >
                  <Text
                    style={[styles.cellContent, ...rowStyles[idx]]}
                  >
                    {statExtractor.get(car, Stat.NUM)}
                  </Text>
                </View>
              )
            )
          }
        </View>
        <ScrollView horizontal>
          {
            state.manifest.colSpec.slice(1).map(
              (stat, idx) => {
                return (
                  <View
                    key={idx}
                    style={styles.column}
                  >
                    <View style={styles.cell}>
                      <Text style={[styles.header, styles.headerRow]}>
                        {stat[0]}
                      </Text>
                    </View>

                    {
                      (state.cars || []).map(
                        (car, idx) => (
                          <View
                            key={idx}
                            style={styles.cell}
                          >
                            <TimingTableCell
                              car={car}
                              stat={stat}
                              statExtractor={statExtractor}
                              style={[styles.cellContent, ...rowStyles[idx]]}
                            />
                          </View>
                        )
                      )
                    }
                  </View>
                )
              }
            )
          }
        </ScrollView>
      </View>
    </ScrollView>
  )
};
