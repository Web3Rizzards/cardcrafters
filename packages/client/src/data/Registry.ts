export type Id<Brand> = { __brand: Brand, value: number }

export default class Registry<Brand, A> {
  brand: Brand
  items: A[]

  constructor(brand: Brand) {
    this.brand = brand
    this.items = []
  }

  add(item: A): Id<Brand> {
    const l = this.items.push(item)
    return { __brand: this.brand, value: l - 1 }
  }

  get(id: Id<Brand>): A {
    const item = this.items[id.value]
    if (item === undefined) throw new Error(`[Registry] Didn't find item with id: ${id.value}`)
    return item
  }
}