/*
description
:
"Formula 3 - Free Practice"
durationSeconds
:
2700
endTime
:
"2025-07-04T08:30:00.000Z"
running
:
false
sessionID
:
"0122acf6-0863-4eed-8696-ed910e069685"
source
:
"https://www.fiaformula3.com/livetiming/index.html"
start
:
"2025-07-04T07:45:00.000Z"
started
:
false
*/

export type Session = {
  description: string,
  durationSeconds: number,
  endTime: string,
  running?: boolean,
  sessionID: string,
  source: string,
  start: string,
  started?: boolean
}

export type SessionsResponse = {
  items: Session[],
  meta: {
    total: number
  }
}
