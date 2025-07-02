import { useQuery } from "@tanstack/react-query";
import { SessionsResponse } from './types';

export const API_ROOT = process.env.DVR_API_ROOT || 'https://dvr.timing71.org';

const fetchQuery = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useUpcomingQuery = (limit=10) => {

  let queryString = `${API_ROOT}/sessions?perPage=${limit}`;

  return useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: () => fetchQuery<SessionsResponse>(queryString),
    refetchInterval: 60 * 1000
  });
};
