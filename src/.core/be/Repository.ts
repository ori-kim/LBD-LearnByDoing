import { Identifiable } from './const';

export class InMemoryRepository<T> {
  private memory: Identifiable<T>[] = [];
  private id = 1;

  private isMatch(owner: Partial<T>, target: Partial<T>): boolean {
    for (const key in target) {
      if (!owner.hasOwnProperty(key) || target[key as keyof typeof target] !== owner[key as keyof typeof owner]) {
        return false;
      }
    }
    return true;
  }

  private generateId() {
    return this.id++;
  }

  async create(arg: T) {
    const data = { ...arg, id: this.generateId() };

    this.memory.push(data);

    return data;
  }

  async delete(query: Partial<Identifiable<T>>) {
    const index = this.memory.findIndex((t) => this.isMatch(t, query));

    if (index === -1) throw new Error('Not found');

    const deletedData = this.memory[index];

    this.memory = this.memory.filter((t) => t.id !== deletedData.id);

    return deletedData;
  }

  async update(query: Partial<Identifiable<T>>, data: Partial<Identifiable<T>>) {
    const index = this.memory.findIndex((item) => this.isMatch(item, query));

    if (index === -1) throw new Error('Not found');

    this.memory[index] = { ...this.memory[index], ...data };

    return this.memory[index];
  }

  async findMany(query: Partial<Identifiable<T>>) {
    return this.memory.filter((item) => this.isMatch(item, query));
  }

  async findOne(query: Partial<Identifiable<T>>) {
    const data = this.memory.find((item) => this.isMatch(item, query));

    if (!data) throw new Error('Not found');

    return data;
  }
}
