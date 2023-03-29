export const _nextPagination = (startPagination: any, setStartPagination: any, endPagination:any, setEndPagination: any) => {
    setStartPagination(startPagination + 10)
    setEndPagination(endPagination + 10)
  }

  export const _previousPagination = (startPagination: any, setStartPagination: any, endPagination:any, setEndPagination: any) => {
    if (startPagination > 1) {
      setStartPagination(startPagination - 10)
      setEndPagination(endPagination - 10)
    }
  }

  export const _pagination = (st: any, end: any, setStartPagination: any, setEndPagination: any) => {
    setStartPagination(st)
    setEndPagination(end)
  }