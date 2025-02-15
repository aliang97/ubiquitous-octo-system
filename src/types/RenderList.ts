export type RenderInstruction = {
  command: string,
  params?: object,
  duration: number, // in MS
  id: string,
}

export type RenderList = RenderInstruction[];
