export default interface ErrorInterface extends Error {
  statusCode: number;
  status: string;
}
