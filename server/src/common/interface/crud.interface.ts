export default interface CRUD {
  readOne(params: object): Promise<unknown>;
  readAll(query: Record<string, any>): Promise<unknown>;
  createOne(payload: object): Promise<unknown>;
  updateOne(params: string, payload: object): Promise<unknown>;
  deleteOne(params: string): Promise<unknown>;
  countAll(): Promise<unknown>;
}
