import dayjs from "dayjs";
import Logger from "pino";

export const logger = Logger({
  transport: {
    target: "pino-pretty",
  },
  base: {
    pid: false,
  },
  timestamps: () => `, Time: "${dayjs().format()}"`,
});
