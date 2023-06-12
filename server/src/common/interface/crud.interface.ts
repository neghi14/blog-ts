export default interface CRUD {
  readOne(params: object): Promise<any>;
  readAll(query: Record<string, any>): Promise<any>;
  createOne(payload: object): Promise<any>;
  updateOne(params: string, payload: object): Promise<any>;
  deleteOne(params: string): Promise<any>;
  countAll(): Promise<any>;
}
