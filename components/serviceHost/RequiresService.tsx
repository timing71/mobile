import { ReactNode } from 'react';
import { ThemedText } from '../ThemedText';
import { useServiceContext } from './context';

type Props = {
  children: ReactNode,
  requireState?: boolean
}

export const RequiresService = ({ children, requireState }: Props) => {
  const { service, state } = useServiceContext();

  if (!service) {
    return (
      <ThemedText type='title'>There is no service running</ThemedText>
    )
  }

  if (!state) {
    return (
      <ThemedText type='title'>Waiting for timing data...</ThemedText>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
