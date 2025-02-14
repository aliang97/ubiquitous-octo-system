export const removeFromObjectListById = (id: string, list: {id: string}[]) => {
  const index = list.findIndex((el) => el.id === id);
  if (index > -1) {
    list.splice(index, 1);
  }
}

export const SERVER_TICK_RATE_MS = 10;

