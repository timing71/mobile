import { Service, ServiceState } from '@timing71/common';
import React, { createContext, useContext, useState } from 'react';

type ServiceContextType = {
  service?: Service,
  setService?: (s: Service) => void,
  state?: ServiceState,
  setState?: (s: ServiceState) => void
}

const ServiceContext = createContext<ServiceContextType>({});

type Props = {
  children: React.ReactNode
}

export const ServiceContextProvider = ({ children }: Props) => {
  const [service, setService] = useState<Service>();
  const [state, setState] = useState<ServiceState>();

  return (
    <ServiceContext.Provider value={{ service, setService, state, setState }}>
      { children }
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);
