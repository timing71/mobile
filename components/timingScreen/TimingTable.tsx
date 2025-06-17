import { Colors } from '@/constants/Colors'
import { ServiceState, Stat, StatExtractor } from '@timing71/common'
import { ScrollView, StyleProp, StyleSheet, Text, TextStyle } from 'react-native'
import { Cell, Row, Table } from 'react-native-gifted-table'
import { TimingTableCell } from './TimingTableCell'
import { carStateRow, carStateRowAlt } from './colours'

type Props = {
  state: ServiceState
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 6
  },
  innerWrapper: {
    marginBottom: 10
  },
  table: {
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  cell: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    maxWidth: 250,
    color: 'white'
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
    borderColor: Colors.app.highlight
  },
  header: {
    color: Colors.app.highlight,
    fontFamily: 'Play-Regular',
    textTransform: 'uppercase'
  },
  highlight: {
    color: Colors.app.highlight
  },
  cellContent: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'DejaVuSans'
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

  const statExtractor = new StatExtractor(state.manifest.colSpec);

  return (
    <ScrollView style={styles.wrapper}>
      <ScrollView horizontal style={styles.innerWrapper}>
        <Table style={styles.table}>
          <Row style={[styles.row, styles.headerRow]}>
            <Cell
              render={() => <Text style={[styles.header, styles.right]}>Pos</Text>}
              style={styles.cell}
            />
            {
              state.manifest.colSpec.map(
                (stat, idx) => (
                  <Cell
                    key={idx}
                    render={() => {
                      return (
                        <Text style={styles.header}>
                          { stat[0] }
                        </Text>
                      )
                    }}
                    style={styles.cell}
                  />
                )
              )
            }
          </Row>
          {
            (state.cars || []).map(
              (car, idx) => {
                const carState = statExtractor.get(car, Stat.STATE);
                const lastLap = statExtractor.get(car, Stat.LAST_LAP);
                const bestLap = statExtractor.get(car, Stat.BEST_LAP);

                const shouldShowSB = lastLap[1] === 'sb-new' || bestLap[1] === 'sb-new';

                const rowStyles: StyleProp<TextStyle>[] = [styles.row];

                if (carStateRow[carState]) {
                  rowStyles.push(carStateRow[carState])
                }

                if (shouldShowSB) {
                  rowStyles.push(styles.sbNewRow);
                }

                if (idx % 2 === 1) {
                  if (!shouldShowSB) {
                    rowStyles.push(styles.rowAlt);
                  }
                  if (carStateRowAlt[carState]) {
                    rowStyles.push(carStateRowAlt[carState])
                  }
                }

                return (
                  <Row
                    key={car[0] as string}
                    style={rowStyles}
                  >
                    <Cell
                      render={() => <Text style={[styles.cellContent, styles.highlight, styles.right, shouldShowSB && styles.sbNewCell]}>{idx + 1}</Text>}
                      style={[styles.cell]}
                    />
                    {
                      state.manifest.colSpec.map(
                        (stat, idx) => (
                          <Cell
                            key={idx}
                            render={() => {
                              return (
                                <TimingTableCell
                                  car={car}
                                  stat={stat}
                                  statExtractor={statExtractor}
                                  style={[styles.cellContent, shouldShowSB && styles.sbNewCell]}
                                />
                              )
                            }}
                            style={styles.cell}
                          />
                        )
                      )
                    }
                  </Row>
                );
              }
            )
          }
        </Table>
      </ScrollView>
    </ScrollView>
  )
};
