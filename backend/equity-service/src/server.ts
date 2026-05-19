import app from "./app";
import { testDB } from "./config/dbTest";

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Equity Service running on port ${PORT}`);

  await testDB();
});