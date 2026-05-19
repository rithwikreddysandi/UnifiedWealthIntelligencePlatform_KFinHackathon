export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {

  let lastError: any;

  for (let attempt = 1; attempt <= retries; attempt++) {

    try {

      return await fn();

    } catch (error) {

      lastError = error;

      console.error(
        `Retry Attempt ${attempt} Failed`
      );

      if (attempt < retries) {

        await new Promise((resolve) =>
          setTimeout(resolve, delay)
        );
      }
    }
  }

  throw lastError;
};