export type RenderInstruction = {
  command: string,
  params?: object,
  duration: number | 'infinite', // in MS
  id: string,
}

export type RenderList = RenderInstruction[];
