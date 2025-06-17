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
    backgroundColor: '#202020'
  },
  header: {
    fontWeight: '600',
    color: '#54FFFF',
    textTransform: 'uppercase'
  },
  cellContent: {
    fontSize: 16
  },
  right: {
    textAlign: 'right'
  },
  sbNewRow: {
    backgroundColor: '#FF53E3'
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
          <Row style={styles.row}>
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
                      render={() => <Text style={[styles.cellContent, styles.header, styles.right, shouldShowSB && styles.sbNewCell]}>{idx + 1}</Text>}
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
                                  style={[styles.cell, shouldShowSB && styles.sbNewCell]}
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
