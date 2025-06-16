import { ServiceState, StatExtractor } from '@timing71/common'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Cell, Row, Table } from 'react-native-gifted-table'

type Props = {
  state: ServiceState
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    paddingBottom: 24
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
    color: 'white',
    padding: 1
  },
  right: {
    textAlign: 'right'
  }
})

export const TimingTable = ({ state }: Props) => {

  const statExtractor = new StatExtractor(state.manifest.colSpec);

  return (
    <ScrollView style={styles.wrapper}>
      <ScrollView horizontal>
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
              (car, idx) => (
                <Row
                  key={car[0] as string}
                  style={[styles.row, idx % 2 === 1 && styles.rowAlt]}
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
                              <Text style={styles.cellContent}>
                                { statExtractor.get(car, stat) }
                              </Text>
                            )
                          }}
                          style={styles.cell}
                        />
                      )
                    )
                  }
                </Row>
              )
            )
          }
        </Table>
      </ScrollView>
    </ScrollView>
  )
};
