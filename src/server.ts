import App from "./app";
import Database from "./db";

(async () => {
  try {
    const port = parseInt(`${process.env.PORT}`);
    await Database.sync();
    await App.listen(port);
  } catch (err: any) {
    throw new Error(err);
  }
})();
