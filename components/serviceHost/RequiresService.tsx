import { PropsWithChildren } from 'react';
import { ThemedText } from '../ThemedText';
import { useServiceContext } from './context';

export const RequiresService = ({ children }: PropsWithChildren) => {
  const { service } = useServiceContext();

  if (!service) {
    return (
      <ThemedText type='title'>There is no service running</ThemedText>
    )
  }

  return (
    <>
      {children}
    </>
  )
}
