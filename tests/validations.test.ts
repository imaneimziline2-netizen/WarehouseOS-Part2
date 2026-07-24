import { registerSchema } from "@/lib/validations";

describe("Register Validation", () => {
  test("accepts valid data", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result.success).toBe(true);
  });

  test("rejects invalid email", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(result.success).toBe(false);
  });

  test("rejects short password", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "123",
      confirmPassword: "123",
    });

    expect(result.success).toBe(false);
  });

  test("rejects different passwords", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      confirmPassword: "password321",
    });

    expect(result.success).toBe(false);
  });
});