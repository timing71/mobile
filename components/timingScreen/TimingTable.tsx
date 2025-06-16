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
    margin: 10,
  },
  innerWrapper: {
    marginBottom: 24
  },
  table: {
    alignItems: 'flex-start',
    backgroundColor: 'black',
  },
  cell: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: 250,
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
    color: '#FFFF00',
    padding: 1
  },
  right: {
    textAlign: 'right'
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

                const rowStyles: StyleProp<TextStyle>[] = [styles.row];

                if (carStateRow[carState]) {
                  rowStyles.push(carStateRow[carState])
                }

                if (idx % 2 === 1) {
                  rowStyles.push(styles.rowAlt);
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
                      render={() => <Text style={[styles.cellContent, styles.header, styles.right]}>{idx + 1}</Text>}
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
