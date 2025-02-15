export type EntityArgs = {
  name?: string;
};

export class Entity {
  id: string;
  name: string;

  static id = 0;

  static generateId() {
    return `e-${Entity.id++}`;
  }

  constructor(args: EntityArgs = {}) {
    this.id = Entity.generateId();
    this.name = args.name || 'Entity Name';
  }
}
