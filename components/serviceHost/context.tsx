import { Events, Service, ServiceState } from '@timing71/common';
import React, { createContext, useContext, useState } from 'react';
import { connectionService, createServiceForURL } from '.';

type ServiceContextType = {
  launchTiming: (url: string) => void,
  service?: Service,
  setService?: (s: Service | undefined) => void,
  state?: ServiceState,
  setState?: (s: ServiceState) => void
}

const ServiceContext = createContext<ServiceContextType>({
  launchTiming: () => {}
});

type Props = {
  children: React.ReactNode
}

export const ServiceContextProvider = ({ children }: Props) => {
  const [service, setService] = useState<Service>();
  const [state, setState] = useState<ServiceState>();

  const launchTiming = (url: string) => {
      if (service) {
        service.stop();
      }
      const newService = createServiceForURL(url);
      if (newService) {
        newService.on(Events.STATE_CHANGE, (state: ServiceState) => {
          setState?.(state)
        })
        newService.start(connectionService);
        setService?.(newService);
      }
    }

  return (
    <ServiceContext.Provider value={{ launchTiming, service, setService, state, setState }}>
      { children }
    </ServiceContext.Provider>
  );
}

export const useServiceContext = () => useContext(ServiceContext);
