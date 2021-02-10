import App from "./app";

const port = parseInt(`${process.env.PORT}`);

App.listen(port, () => console.log("running..."));
