import { ServiceState, StatExtractor } from '@timing71/common'
import { FlatList } from 'react-native'
import { TimingTableRow } from './TimingTableRow'

type Props = {
  state: ServiceState
}

export const TimingTable = ({ state }: Props) => {

  const statExtractor = new StatExtractor(state.manifest.colSpec);

  return (
    <FlatList
      data={state.cars}
      renderItem={({item}) => (
        <TimingTableRow car={item} colSpec={state.manifest.colSpec} statExtractor={statExtractor} />
      )}
    />
  );
};
