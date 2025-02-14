export type RenderInstruction = {
  command: string,
  duration: number, // in MS
  id: string,
}

export type RenderQueue = RenderInstruction[];
