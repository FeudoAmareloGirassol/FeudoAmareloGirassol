export interface ExampleCreateRequest extends ExampleBase {

}

export interface ExampleModel extends ExampleBase {
  id: number,
  created: Date
}

export interface ExampleBase {
  name: string
}
