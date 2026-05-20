import bcrypt from "bcrypt";

async function main() {

  const password =
    "Admin@123";

  const hash =
    await bcrypt.hash(
      password,
      10
    );

  console.log(hash);

  const valid =
    await bcrypt.compare(
      password,
      hash
    );

  console.log(
    "VALID:",
    valid
  );
}

main();